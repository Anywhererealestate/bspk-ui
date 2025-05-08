import { SvgSearch } from '@bspk/icons/Search';
import { css } from '@emotion/react';
import { useRef } from 'react';

import { Menu, MenuItem, MenuProps } from './Menu';
import { Portal } from './Portal';
import { TextInput, TextInputProps } from './TextInput';
import { useFloatingMenu } from './hooks/useFloatingMenu';
import { useId } from './hooks/useId';
//import { useFloatingMenu } from './hooks/useFloatingMenu';

export type SearchBarProps = Pick<MenuProps, 'itemCount' | 'items' | 'noResultsMessage'> &
    Pick<TextInputProps, 'aria-label' | 'id' | 'inputRef' | 'name' | 'placeholder' | 'size'> & {
        /** The current value of the search bar. */
        searchValue?: string;
        /**
         * Handler for state updates.
         *
         * @type (value: String) => void
         * @required
         */
        setSearchValue: (value: string) => void;
        /*
         * Handler for item selection.
         *
         * @type (item: MenuItem) => void
         * @required
         */
        onSelect: (item?: MenuItem) => void;
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
    searchValue,
    setSearchValue,
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
            <TextInput
                aria-label={ariaLabel}
                autoComplete="off"
                containerRef={triggerRef}
                css={style}
                id={id}
                inputRef={(node) => {
                    inputRef?.(node || null);
                    inputRefLocal.current = node;
                }}
                leading={<SvgSearch />}
                name={name}
                onChange={(str) => setSearchValue(str)}
                placeholder={placeholder}
                size={size}
                value={searchValue}
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
            <Portal>
                <Menu
                    itemCount={itemCount}
                    items={items}
                    noResultsMessage={noResultsMessage}
                    onChange={(selectedValues, event) => {
                        event?.preventDefault();
                        const item = items?.find((i) => i.value === selectedValues[0]);
                        onSelect?.(item);
                        setSearchValue(item?.label || '');
                        closeMenu();
                    }}
                    {...menuProps}
                />
            </Portal>
        </>
    );
}

SearchBar.bspkName = 'SearchBar';

export { SearchBar };

export const style = css`
    display: flex;
    width: 100%;
    min-width: 300px;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
