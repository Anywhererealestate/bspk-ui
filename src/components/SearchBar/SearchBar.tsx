import './search-bar.scss';
import { SvgSearch } from '@bspk/icons/Search';
import { useEffect, useMemo, useState } from 'react';
import { ListItem, ListItemProps } from '-/components/ListItem';
import { Menu } from '-/components/Menu';
import { TextInputProps, TextInput } from '-/components/TextInput';
import { Txt } from '-/components/Txt';
import { useArrowNavigation } from '-/hooks/useArrowNavigation';
import { useFloating } from '-/hooks/useFloating';
import { useId } from '-/hooks/useId';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { useUIContext } from '-/hooks/useUIContext';
import { getElementById } from '-/utils/dom';
import { handleKeyDown } from '-/utils/handleKeyDown';
import { scrollListItemsStyle, ScrollListItemsStyleProps } from '-/utils/scrollListItemsStyle';
import { useIds } from '-/utils/useIds';

/**
 * An option in a SearchBar component.
 *
 * Essentially the props for a ListItem except for `value` which is required.
 */
export type SearchBarOption = Pick<ListItemProps, 'label' | 'leading' | 'trailing'>;

export type SearchBarProps = Pick<TextInputProps, 'aria-label' | 'disabled' | 'id' | 'inputRef' | 'name' | 'size'> &
    ScrollListItemsStyleProps & {
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
         * Handler for input value change. This is called on every key press in the input field and when a menu item is
         * selected.
         *
         * @type (value: String) => void
         * @required
         */
        onChange: (value: string, item?: SearchBarOption) => void;
        /**
         * Content to display in the menu.
         *
         * @example
         *     [
         *         { label: 'Apple Pie' },
         *         { label: 'Banana Split' },
         *         { label: 'Cherry Tart' },
         *         { label: 'Dragonfruit Sorbet' },
         *         { label: 'Elderberry Jam' },
         *         { label: 'Fig Newton' },
         *         { label: 'Grape Soda' },
         *         { label: 'Honeydew Smoothie' },
         *         { label: 'Ice Cream Sandwich' },
         *         { label: 'Jackfruit Pudding' },
         *     ];
         *
         * @type Array<SearchBarOption>
         */
        items?: SearchBarOption[];
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
 *                     { label: 'Apple Pie' },
 *                     { label: 'Banana Split' },
 *                     { label: 'Cherry Tart' },
 *                     { label: 'Dragonfruit Sorbet' },
 *                     { label: 'Elderberry Jam' },
 *                     { label: 'Fig Newton' },
 *                     { label: 'Grape Soda' },
 *                     { label: 'Honeydew Smoothie' },
 *                     { label: 'Ice Cream Sandwich' },
 *                     { label: 'Jackfruit Pudding' },
 *                 ]}
 *                 name="Example name"
 *                 placeholder="Search"
 *                 value={searchText}
 *                 onChange={setSearchText}
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
    value,
    onChange,
    disabled = false,
    scrollLimit,
}: SearchBarProps) {
    const id = useId(idProp);
    const menuId = `${id}-menu`;

    const items = useIds(`search-bar-${id}`, itemsProp || []);

    const [hasFocus, setHasFocus] = useState(false);

    const filteredItems = useMemo(() => {
        const valueStr = value?.toString().trim().toLowerCase() || '';
        return items.filter((item) => !valueStr || item.label.toLowerCase().includes(valueStr));
    }, [items, value]);

    const { sendAriaLiveMessage } = useUIContext();

    useEffect(() => {
        if (!items.length) sendAriaLiveMessage('No results found', 'assertive');
    }, [items.length, sendAriaLiveMessage, value]);

    const { activeElementId, setActiveElementId, arrowKeyCallbacks } = useArrowNavigation({
        ids: filteredItems.map((i) => i.id),
    });

    const closeMenu = () => setActiveElementId(null);
    const open = Boolean(activeElementId);

    const { elements, floatingStyles } = useFloating({
        hide: !open,
        offsetOptions: 4,
        refWidth: true,
    });

    useOutsideClick({
        elements: [elements.floating, elements.reference],
        callback: closeMenu,
        disabled: !open,
    });

    const spaceEnter = () => {
        if (!open) {
            elements.reference?.click();
            return;
        }
        if (activeElementId) getElementById(activeElementId)?.click();
    };

    useEffect(() => {
        if (!hasFocus) {
            setActiveElementId(null);
            return;
        }

        if (activeElementId) return;

        // If we have focus but no active element, set the first item as active (if there is one)
        if (filteredItems.length) {
            setActiveElementId(value?.trim().length ? filteredItems[0].id : null);
        }
    }, [hasFocus, filteredItems, activeElementId, setActiveElementId, value]);

    return (
        <>
            <div data-bspk="search-bar">
                <TextInput
                    aria-label={ariaLabel}
                    autoComplete="off"
                    containerRef={elements.setReference}
                    disabled={disabled}
                    id={id}
                    inputProps={{
                        'aria-controls': open ? menuId : undefined,
                        'aria-expanded': open,
                        'aria-haspopup': 'listbox',
                        'aria-activedescendant': activeElementId || undefined,
                        'aria-autocomplete': 'list',
                        role: 'combobox',
                        spellCheck: 'false',
                    }}
                    inputRef={(node) => {
                        if (!node) return;
                        inputRef?.(node);
                    }}
                    leading={<SvgSearch />}
                    name={name}
                    onBlur={() => {
                        setHasFocus(false);
                        closeMenu();
                    }}
                    onChange={(str) => onChange(str)}
                    onFocus={() => setHasFocus(true)}
                    onKeyDown={handleKeyDown(
                        {
                            ...arrowKeyCallbacks,
                            ArrowDown: (event) => {
                                if (!open) spaceEnter();
                                arrowKeyCallbacks.ArrowDown?.(event);
                            },
                            Space: spaceEnter,
                            Enter: spaceEnter,
                            'Ctrl+Option+Space': spaceEnter,
                        },
                        { preventDefault: true, stopPropagation: true },
                    )}
                    owner="search-bar"
                    placeholder={placeholder}
                    size={size}
                    value={value}
                />
            </div>

            <Menu
                aria-autocomplete={undefined}
                as="div"
                id={menuId}
                innerRef={elements.setFloating}
                onClickCapture={() => {
                    // Prevent the menu from closing when clicking inside it
                    // maintain focus on the select control
                    elements.reference?.focus();
                }}
                onFocus={() => {
                    elements.reference?.focus();
                }}
                owner="select"
                role="listbox"
                style={{
                    ...(open ? scrollListItemsStyle(scrollLimit, items.length) : {}),
                    ...floatingStyles,
                }}
                tabIndex={-1}
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
                {filteredItems.map((item) => {
                    const isActive = activeElementId === item.id;
                    const isSelected = value == item.label;

                    return (
                        <ListItem
                            key={item.id}
                            {...item}
                            active={isActive || undefined}
                            aria-label={undefined}
                            aria-selected={isSelected}
                            as="li"
                            onClick={() => {
                                onChange(item.label, item);
                                closeMenu();
                            }}
                            owner="select"
                            role="option"
                            tabIndex={-1} //show && isActive ? -1 : 0}
                            value={undefined}
                        />
                    );
                })}
            </Menu>
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
