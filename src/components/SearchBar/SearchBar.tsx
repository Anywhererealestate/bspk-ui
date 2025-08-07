import { SvgSearch } from '@bspk/icons/Search';
import { useRef } from 'react';

import { Listbox, ListboxProps, ListboxItemProps } from '-/components/Listbox';
import { TextInputProps, TextInput } from '-/components/TextInput';
import { Txt } from '-/components/Txt';
import { useCombobox } from '-/hooks/useCombobox';
import { useId } from '-/hooks/useId';

import './search-bar.scss';

export type SearchBarProps<T extends ListboxItemProps = ListboxItemProps> = Pick<ListboxProps<T>, 'itemDisplayCount'> &
    Pick<TextInputProps, 'aria-label' | 'disabled' | 'id' | 'inputRef' | 'name' | 'size'> & {
        /** The current value of the search bar. */
        value?: string;
        /**
         * The placeholder of the field.
         *
         * @default Search
         *
         * @required
         */
        placeholder: string;
        /**
         * Handler for state updates.
         *
         * @type (value: String) => void
         * @required
         */
        onChange: (value: string) => void;
        /*
         * Handler for item selection.
         *
         * @type (item: MenuItem) => void
         * @required
         */
        onSelect: (item?: ListboxItemProps) => void;
        /**
         * Content to display in the menu.
         *
         * @example
         *     [
         *         { value: '1', label: 'Apple Pie' },
         *         { value: '2', label: 'Banana Split' },
         *         { value: '3', label: 'Cherry Tart' },
         *         { value: '4', label: 'Dragonfruit Sorbet' },
         *         { value: '5', label: 'Elderberry Jam' },
         *         { value: '6', label: 'Fig Newton' },
         *         { value: '7', label: 'Grape Soda' },
         *         { value: '8', label: 'Honeydew Smoothie' },
         *         { value: '9', label: 'Ice Cream Sandwich' },
         *         { value: '10', label: 'Jackfruit Pudding' },
         *     ];
         *
         * @type Array<MenuItem>
         */
        items?: T[];
        /**
         * Message to display when no results are found
         *
         * @type multiline
         */
        noResultsMessage?: string;
    };

/**
 * Component description coming soon.
 *
 * @example
 *     import { useState } from 'react';
 *     import { SearchBar } from '@bspk/ui/SearchBar';
 *
 *     export function Example() {
 *         const [searchText, setSearchText] = useState<string>('');
 *
 *         const handleItemSelect = (item) => console.log('Selected item:', item);
 *
 *         return (
 *             <SearchBar
 *                 aria-label="Example aria-label"
 *                 items={[
 *                     { value: '1', label: 'Apple Pie' },
 *                     { value: '2', label: 'Banana Split' },
 *                     { value: '3', label: 'Cherry Tart' },
 *                     { value: '4', label: 'Dragonfruit Sorbet' },
 *                     { value: '5', label: 'Elderberry Jam' },
 *                     { value: '6', label: 'Fig Newton' },
 *                     { value: '7', label: 'Grape Soda' },
 *                     { value: '8', label: 'Honeydew Smoothie' },
 *                     { value: '9', label: 'Ice Cream Sandwich' },
 *                     { value: '10', label: 'Jackfruit Pudding' },
 *                 ]}
 *                 name="Example name"
 *                 placeholder="Search"
 *                 value={searchText}
 *                 onChange={setSearchText}
 *                 onSelect={handleItemSelect}
 *             />
 *         );
 *     }
 *
 * @name SearchBar
 * @phase UXReview
 */
function SearchBar({
    itemDisplayCount: itemCount,
    items,
    noResultsMessage,
    placeholder = 'Search',
    'aria-label': ariaLabel,
    id: idProp,
    inputRef,
    name,
    size = 'medium',
    onSelect,
    value,
    onChange,
    disabled = false,
}: SearchBarProps) {
    const id = useId(idProp);

    const {
        isOpen,
        toggleProps: { onClick, onKeyDownCapture, ...triggerProps },
        menuProps,
        closeMenu,
        openMenu,
        elements,
    } = useCombobox({
        placement: 'bottom-start',
    });

    const inputRefLocal = useRef<HTMLInputElement | null>(null);
    const containerRefLocal = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <div data-bspk="search-bar">
                <TextInput
                    aria-label={ariaLabel}
                    autoComplete="off"
                    containerRef={(node) => {
                        if (!node) return;
                        containerRefLocal.current = node;
                        elements.setReference(node);
                    }}
                    disabled={disabled}
                    id={id}
                    inputRef={(node) => {
                        inputRef?.(node || null);
                        inputRefLocal.current = node;
                    }}
                    leading={<SvgSearch />}
                    name={name}
                    onChange={(str) => {
                        onChange(str);
                        if (str.length) openMenu();
                    }}
                    onClick={onClick}
                    owner="search-bar"
                    {...triggerProps}
                    onKeyDownCapture={(event) => {
                        const handled = onKeyDownCapture(event);
                        if (handled) {
                            inputRefLocal.current?.blur();
                            containerRefLocal.current?.focus();
                            return;
                        }
                        // inputRefLocal.current?.focus();
                    }}
                    placeholder={placeholder}
                    size={size}
                    value={value}
                />
            </div>
            {isOpen && (
                <Listbox
                    innerRef={elements.setFloating}
                    itemDisplayCount={itemCount}
                    items={items}
                    onChange={(selectedValues, event) => {
                        event?.preventDefault();
                        const item = items?.find((i) => i.value === selectedValues[0]);
                        onSelect?.(item);
                        onChange(item?.label || '');
                        closeMenu();
                    }}
                    {...menuProps}
                >
                    {!!value?.length && !items?.length && (
                        <div data-bspk="no-items-found">
                            <Txt as="div" variant="heading-h5">
                                No results found
                            </Txt>
                            {noResultsMessage && (
                                <Txt as="div" variant="body-base">
                                    {noResultsMessage}
                                </Txt>
                            )}
                        </div>
                    )}
                </Listbox>
            )}
        </>
    );
}

SearchBar.bspkName = 'SearchBar';

export { SearchBar };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
