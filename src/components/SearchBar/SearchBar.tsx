import { SvgSearch } from '@bspk/icons/Search';

import { ListItemMenu, ListItemMenuProps, MenuListItem } from '-/components/ListItemMenu';
import { TextInputProps, TextInput } from '-/components/TextInput';
import { Txt } from '-/components/Txt';
import { useId } from '-/hooks/useId';

import './search-bar.scss';

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
         * @type (item: MenuItem) => void
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
         * @type Array<MenuItem>
         */
        items?: MenuListItem[];
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
export function SearchBar({
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
    scrollLimit,
}: SearchBarProps) {
    const id = useId(idProp);

    return (
        <>
            <div data-bspk="search-bar">
                <ListItemMenu
                    disabled={disabled}
                    items={({ setShow }) =>
                        (items || []).map((item) => ({
                            ...item,
                            role: 'option',
                            onClick: () => {
                                onSelect(item);
                                onChange(item.label);
                                setShow(false);
                            },
                        }))
                    }
                    menuLeading={
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
                    menuRole="listbox"
                    owner="search-bar"
                    scrollLimit={scrollLimit}
                >
                    {(toggleProps, { setRef, showMenu }) => (
                        <TextInput
                            aria-label={ariaLabel}
                            autoComplete="off"
                            containerRef={setRef}
                            disabled={disabled}
                            id={id}
                            inputRef={inputRef}
                            leading={<SvgSearch />}
                            name={name}
                            onChange={(str) => {
                                onChange(str);
                                if (str.length) showMenu();
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
