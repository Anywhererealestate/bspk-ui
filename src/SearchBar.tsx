import { SvgSearch } from '@bspk/icons/Search';
import './search-bar.scss';
import { useRef } from 'react';

import { MenuItem, MenuProps, Menu } from './Menu';
import { Portal } from './Portal';
import { TextInputProps, TextInput } from './TextInput';
import { Txt } from './Txt';
import { useFloatingMenu } from './hooks/useFloatingMenu';
import { useId } from './hooks/useId';
//import { useFloatingMenu } from './hooks/useFloatingMenu';

export type SearchBarProps<T extends MenuItem = MenuItem> = Pick<MenuProps<T>, 'itemCount' | 'noResultsMessage'> &
    Pick<TextInputProps, 'aria-label' | 'id' | 'inputRef' | 'name' | 'placeholder' | 'size'> & {
        /**
         * The current value of the search bar.
         *
         * @default Search
         */
        value?: string;
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
        onSelect: (item?: MenuItem) => void;
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
        /**
         * Whether to show or hide menu.
         *
         * @default true
         */
        showMenu?: boolean;
    };

/**
 * Component description coming soon.
 *
 * @name SearchBar
 */
function SearchBar({
    itemCount,
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
    showMenu = true,
}: SearchBarProps) {
    const id = useId(idProp);
    const {
        triggerProps: { ref: triggerRef, onClick, onKeyDownCapture, ...triggerProps },
        menuProps,
        closeMenu,
    } = useFloatingMenu({
        placement: 'bottom-start',
    });

    const inputRefLocal = useRef<HTMLElement | null>(null);

    return (
        <>
            <div data-bspk="search-bar">
                <TextInput
                    aria-label={ariaLabel}
                    autoComplete="off"
                    containerRef={triggerRef}
                    id={id}
                    inputRef={(node) => {
                        inputRef?.(node || null);
                        inputRefLocal.current = node;
                    }}
                    leading={<SvgSearch />}
                    name={name}
                    onChange={(str) => onChange(str)}
                    placeholder={placeholder}
                    size={size}
                    value={value}
                    {...triggerProps}
                    onClick={(event) => {
                        if (items?.length) onClick(event);
                    }}
                    onKeyDownCapture={(event) => {
                        const handled = onKeyDownCapture(event);

                        if (handled) return;

                        inputRefLocal.current?.focus();
                    }}
                />
            </div>
            {showMenu && (
                <Portal>
                    <Menu
                        itemCount={itemCount}
                        items={items}
                        noResultsMessage={
                            !!value?.length &&
                            !items?.length && (
                                <>
                                    <Txt as="div" variant="heading-h5">
                                        No results found
                                    </Txt>
                                    {noResultsMessage && (
                                        <Txt as="div" variant="body-base">
                                            {noResultsMessage}
                                        </Txt>
                                    )}
                                </>
                            )
                        }
                        onChange={(selectedValues, event) => {
                            event?.preventDefault();
                            const item = items?.find((i) => i.value === selectedValues[0]);
                            onSelect?.(item);
                            onChange(item?.label || '');
                            closeMenu();
                        }}
                        {...menuProps}
                    />
                </Portal>
            )}
        </>
    );
}

SearchBar.bspkName = 'SearchBar';

export { SearchBar };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
