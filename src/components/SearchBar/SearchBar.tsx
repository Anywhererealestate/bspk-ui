import './search-bar.scss';
import { SvgSearch } from '@bspk/icons/Search';
import { useEffect, useRef, useState } from 'react';
import { ListItemMenu, ListItemMenuProps, MenuListItem } from '-/components/ListItemMenu';
import { TextInputProps, TextInput } from '-/components/TextInput';
import { Txt } from '-/components/Txt';
import { useId } from '-/hooks/useId';
import { useUIContext } from '-/hooks/useUIContext';
import { useIds } from '-/utils/useIds';

export type SearchOption = MenuListItem & { value: string };

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
         * @type (value: String) => void
         * @required
         */
        onChange: (value: string) => void;
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
         * @type Array<SearchOption>
         */
        items?: SearchOption[];
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
export function SearchBar({
    items: itemsProp,
    noResultsMessage,
    placeholder = 'Search',
    'aria-label': ariaLabel,
    value: idProp,
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

    const items = useIds(`search-bar-${id}`, itemsProp || []);

    const inputElementRef = useRef<HTMLInputElement | null>(null);

    const { sendAriaLiveMessage } = useUIContext();

    useEffect(() => {
        if (!items.length) sendAriaLiveMessage('No results found', 'assertive');
    }, [items.length, sendAriaLiveMessage, value]);

    const [textValue, setTextValue] = useState(value || '');

    useEffect(() => {
        setTextValue(items.find((item) => item.value === value)?.label || '');
    }, [items, value]);

    return (
        <>
            <div data-bspk="search-bar">
                <ListItemMenu
                    arrowKeyNavigationCallback={(params) => {
                        // maintain default behavior for arrow keys left/right
                        return params.key !== 'ArrowLeft' && params.key !== 'ArrowRight';
                    }}
                    disabled={disabled}
                    itemOnClick={({ currentId, setShow }) => {
                        const item = items.find((i) => i.id === currentId)!;
                        onSelect(item);
                        onChange(item.value);
                        setTextValue(item.label);
                        setShow(false);
                    }}
                    items={items.map((item) => {
                        return {
                            ...item,
                            'aria-selected': item.value === value,
                        };
                    })}
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
                    onClose={() => {
                        setTimeout(() => {
                            if (!inputElementRef.current) return;
                            inputElementRef.current.focus();
                            inputElementRef.current.setSelectionRange(0, inputElementRef.current.value.length);
                        }, 100);
                    }}
                    owner="search-bar"
                    role="listbox"
                    scrollLimit={scrollLimit}
                >
                    {(toggleProps, { setRef, toggleMenu }) => (
                        <TextInput
                            aria-label={(items.length === 0 ? 'No results found' : '') + ariaLabel}
                            autoComplete="off"
                            containerRef={setRef}
                            disabled={disabled}
                            id={id}
                            inputProps={{ ...toggleProps }}
                            inputRef={(node) => {
                                if (!node) return;
                                inputRef?.(node);
                                inputElementRef.current = node;
                            }}
                            leading={<SvgSearch />}
                            name={name}
                            onChange={(str) => {
                                setTextValue(str);
                                if (str.length) toggleMenu(true);
                            }}
                            owner="search-bar"
                            placeholder={placeholder}
                            size={size}
                            value={textValue}
                        />
                    )}
                </ListItemMenu>
            </div>
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
