import { css } from '@emotion/react';
import { ComponentProps, CSSProperties, MouseEvent as ReactMouseEvent, useMemo } from 'react';

import { Checkbox } from './Checkbox';
import { ListItem } from './ListItem';
import { Txt } from './Txt';
import { useId } from './hooks/useId';

import { CommonProps, ElementProps } from './';

export const MIN_ITEM_COUNT = 3;
export const MAX_ITEM_COUNT = 10;

export function menuItemId(menuId: string, index: number) {
    return `menu-${menuId}-item-${index}`;
}

/** The props for the renderListItem function. Useful for customizing menu list items. */
export type RenderListItemParams<M extends MenuItem> = Pick<
    MenuProps<M>,
    'activeIndex' | 'isMulti' | 'selectedValues'
> & {
    index: number;
    item: M;
    menuId: string;
    selected: boolean;
    itemId?: string;
};

/** The props for the menu items. */
export type MenuItem = CommonProps<'disabled'> & {
    /** The content to display in the menu item. */
    label: string;
    /** The value of the menu item. */
    value: string;
    /** The unique id of the menu item. */
    id?: string;
};

export type MenuProps<Item extends MenuItem = MenuItem> = CommonProps<'disabled' | 'id'> & {
    /**
     * The number of items to display in the menu
     *
     * @default 5
     * @minimum 3
     * @maximum 10
     */
    itemCount?: number;
    /**
     * Content to display in the menu.
     *
     * @type MenuItems
     */
    items?: Item[];
    /** A ref to the inner div element. */
    innerRef?: (node: HTMLElement | null) => void;
    /**
     * Message to display when no results are found
     *
     * @type multiline
     */
    noResultsMessage?: string;
    /** The index of the currently highlighted item. */
    activeIndex?: number;
    /** The values of the selected items */
    selectedValues?: string[];
    /**
     * A function which given data about the list item returns additional list item props used to render the list items.
     *
     * @type (props: RenderListItemParams) => ComponentProps<typeof ListItem>;
     * @param {RenderListItemParams} props
     * @returns {ComponentProps<typeof ListItem>}
     */
    renderListItem?: (props: RenderListItemParams<Item>) => Partial<ComponentProps<typeof ListItem>>;
    /**
     * Whether the menu allows multiple selections.
     *
     * @default false
     */
    isMulti?: boolean;
    /**
     * The function to call when the selected values change.
     *
     * @type (selectedValues: String[], event: ChangeEvent) => void
     * @param {string[]} selectedValues
     * @param {ChangeEvent} event
     * @returns {void}
     */
    onChange?: (selectedValues: string[], event?: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

/**
 * A container housing a simple list of options presented to the user to select one option at a time.
 *
 * @name Menu
 */
function Menu<Item extends MenuItem = MenuItem>({
    itemCount: itemCountProp = 5,
    items: itemsProp = [],
    noResultsMessage,
    innerRef,
    onChange,
    activeIndex,
    selectedValues = [],
    disabled,
    id: idProp,
    renderListItem,
    isMulti,
    ...props
}: ElementProps<MenuProps<Item>, 'div'>) {
    const menuId = useId(idProp);
    const items = Array.isArray(itemsProp) ? itemsProp : [];
    const itemCount = useMemo(
        () =>
            // Ensure itemCount is within the range of items.length
            Math.min(
                items.length,
                // pin itemCountProp to a range of 3 to 10
                Math.max(MIN_ITEM_COUNT, Math.min(itemCountProp, MAX_ITEM_COUNT)),
            ),
        [itemCountProp, items.length],
    );

    return (
        <div
            {...props}
            css={style}
            data-disabled={disabled || undefined}
            data-item-count={itemCount || undefined}
            data-menu=""
            data-no-items={!items.length || undefined}
            id={menuId}
            ref={innerRef}
            role="listbox"
            style={{ ...props.style, '--item-count': itemCount } as CSSProperties}
        >
            {items.length ? (
                items.map((item, index) => {
                    const itemId = item.id || menuItemId(menuId, index);

                    const selected = Array.isArray(selectedValues) && selectedValues.includes(item.value);

                    const renderProps = renderListItem?.({
                        activeIndex,
                        index,
                        item,
                        selectedValues,
                        isMulti,
                        menuId: menuId || '',
                        selected,
                        itemId,
                    });

                    return (
                        <ListItem
                            {...renderProps}
                            active={activeIndex === index || undefined}
                            aria-disabled={item.disabled || undefined}
                            aria-posinset={index + 1}
                            aria-selected={selected || undefined}
                            as="button"
                            data-menu-item
                            data-selected={selected || undefined}
                            disabled={item.disabled || undefined}
                            id={itemId}
                            key={itemId}
                            label={renderProps?.label?.toString() || item.label?.toString()}
                            onClick={(event) => {
                                if (renderProps) renderProps?.onClick?.(event);

                                if (onChange) {
                                    if (!isMulti) {
                                        onChange?.([item.value], event);
                                        return;
                                    }
                                    onChange(
                                        selected
                                            ? selectedValues.filter((value) => value !== item.value)
                                            : [...selectedValues, item.value],
                                        event,
                                    );
                                }
                            }}
                            role="option"
                            tabIndex={-1}
                            trailing={
                                isMulti ? (
                                    <Checkbox
                                        aria-label={item.label}
                                        checked={selected}
                                        name={item.value}
                                        onChange={(checked) => {
                                            onChange?.(
                                                checked
                                                    ? selectedValues.filter((value) => value !== item.value)
                                                    : [...selectedValues, item.value],
                                            );
                                        }}
                                        value={item.value}
                                    />
                                ) : (
                                    renderProps?.trailing
                                )
                            }
                        />
                    );
                })
            ) : (
                <>
                    <Txt as="div" variant="heading-h5">
                        No results found
                    </Txt>
                    <Txt as="div" variant="body-base">
                        {noResultsMessage}
                    </Txt>
                </>
            )}
        </div>
    );
}

Menu.bspkName = 'Menu';

export { Menu };

export const style = css`
    /** 
  --item-count is set via inline style. :)
   */

    width: 332px;
    border: 1px solid var(--stroke-neutral-low);
    background-color: var(--surface-neutral-t1-base);
    box-shadow: var(--drop-shadow-float);
    border-radius: var(--radius-large);
    display: flex;
    flex-direction: column;

    --item-size: var(--spacing-sizing-12);

    &[data-floating] {
        z-index: var(--z-index-dropdown);
    }

    &[data-item-count] {
        height: calc(var(--item-count) * var(--item-size));
        overflow-y: scroll;
    }

    &[data-no-items] {
        padding: var(--spacing-sizing-08) var(--spacing-sizing-04);
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sizing-03);
    }

    [data-list-item] {
        min-height: var(--item-size);
        height: var(--item-size);
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
