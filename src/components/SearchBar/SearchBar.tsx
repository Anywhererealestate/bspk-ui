import './search-bar.scss';
import { SvgSearch } from '@bspk/icons/Search';
import { useRef } from 'react';
import { ListItemProps } from '-/components/ListItem';
import { ListItemMenu, ListItemMenuProps, MenuListItem, useMenuItems } from '-/components/ListItemMenu';
import { TextInputProps, TextInput } from '-/components/TextInput';
import { Txt } from '-/components/Txt';
import { useId } from '-/hooks/useId';

export type SearchBarProps = Pick<ListItemMenuProps, 'scrollLimit'> &
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
         * @type (id: String) => void
         * @required
         */
        onChange: (id: string) => void;
        /*
         * Handler for item selection.
         *
         * @type (item: MenuListItem) => void
         * @required
         */
        onSelect: (item?: MenuListItem) => void;
        /**
         * Content to display in the menu.
         *
         * @example
         *     [
         *         { id: '1', label: 'Apple Pie' },
         *         { id: '2', label: 'Banana Split' },
         *         { id: '3', label: 'Cherry Tart' },
         *         { id: '4', label: 'Dragonfruit Sorbet' },
         *         { id: '5', label: 'Elderberry Jam' },
         *         { id: '6', label: 'Fig Newton' },
         *         { id: '7', label: 'Grape Soda' },
         *         { id: '8', label: 'Honeydew Smoothie' },
         *         { id: '9', label: 'Ice Cream Sandwich' },
         *         { id: '10', label: 'Jackfruit Pudding' },
         *     ];
         *
         * @type Array<ListItemProps>
         */
        items?: ListItemProps[];
        /**
         * Message to display when no results are found
         *
         * @type multiline
         */
        noResultsMessage?: string;
    };

/**
 * An input field that allows customers to input search queries and retrieve results.
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
 *                     { id: '1', label: 'Apple Pie' },
 *                     { id: '2', label: 'Banana Split' },
 *                     { id: '3', label: 'Cherry Tart' },
 *                     { id: '4', label: 'Dragonfruit Sorbet' },
 *                     { id: '5', label: 'Elderberry Jam' },
 *                     { id: '6', label: 'Fig Newton' },
 *                     { id: '7', label: 'Grape Soda' },
 *                     { id: '8', label: 'Honeydew Smoothie' },
 *                     { id: '9', label: 'Ice Cream Sandwich' },
 *                     { id: '10', label: 'Jackfruit Pudding' },
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
export function SearchBar({
    items: itemsProp,
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
    scrollLimit,
}: SearchBarProps) {
    const id = useId(idProp);

    const items = useMenuItems(`search-bar-${id}`, itemsProp || []);

    const inputInternalRef = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <div data-bspk="search-bar">
                <ListItemMenu
                    disabled={disabled}
                    items={({ setShow }) =>
                        items.map(({ ...item }) => ({
                            ...item,
                            onClick: () => {
                                onSelect(item);
                                onChange(item.label);
                                setShow(false);
                                setTimeout(() => {
                                    const inputElement = inputInternalRef.current;
                                    if (!inputElement) return;
                                    inputElement.focus();
                                    inputElement.setSelectionRange(item.label.length, item.label.length);
                                }, 100);
                            },
                        }))
                    }
                    label="Search bar"
                    leading={
                        !!value?.length &&
                        !items?.length && (
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
                        )
                    }
                    owner="search-bar"
                    role="listbox"
                    scrollLimit={scrollLimit}
                >
                    {(toggleProps, { setRef, toggleMenu }) => (
                        <TextInput
                            aria-label={ariaLabel}
                            autoComplete="off"
                            containerRef={setRef}
                            disabled={disabled}
                            id={id}
                            inputRef={(node) => {
                                if (!node) return;
                                inputRef?.(node);
                                inputInternalRef.current = node;
                            }}
                            leading={<SvgSearch />}
                            name={name}
                            onChange={(str) => {
                                onChange(str);
                                if (str.length) toggleMenu(true);
                            }}
                            owner="search-bar"
                            {...toggleProps}
                            placeholder={placeholder}
                            size={size}
                            value={value}
                        />
                    )}
                </ListItemMenu>
            </div>
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
