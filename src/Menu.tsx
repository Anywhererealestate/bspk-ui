import { ReactNode, useMemo } from 'react';

import { Portal } from './Portal';
import { useId } from './hooks/useId';
import { useLockBodyScroll } from './hooks/useLockBodyScroll';
import { cssWithVars } from './utils/cwv';

import { CommonProps, ElementProps, SetRef } from './';

import './menu.scss';

export function menuItemId(menuId: string, index: number) {
    return `menu-${menuId}-item-${index}`;
}

export const MIN_ITEM_COUNT = 3;
export const MAX_ITEM_COUNT = 10;

// returns the item count to display based on the items and the itemDisplayCount bounded by the MIN_ITEM_COUNT and MAX_ITEM_COUNT
function boundCount(itemLength = 0, itemDisplayCount = 0) {
    const minItemCount = Math.max(MIN_ITEM_COUNT, itemLength);
    const maxItemCount = Math.min(MAX_ITEM_COUNT, itemLength);
    return (
        // Ensure we don't display less than the minimum item count
        Math.min(
            minItemCount,
            // Ensure we don't display more items than available
            Math.min(maxItemCount, itemDisplayCount),
        )
    );
}
export type MenuProps = CommonProps<'id'> & {
    /** A ref to the inner div element. */
    innerRef?: SetRef<HTMLDivElement>;
    /**
     * The items to display in the menu. These should be ListItem and Divider components.
     *
     * @required
     */
    children: ReactNode;
    /**
     * Should the menu be rendered in a portal? This is useful for menus that need to be rendered outside of the normal
     * DOM flow, such as dropdowns or modals.
     *
     * @default true
     */
    portal?: boolean;
    /**
     * The number of items to show in the menu. This is used to determine the height of the menu.
     *
     * - If set to `false`, the menu will not have a maximum height and will grow to fit its content.
     * - If set to a number, the menu will display that many items before scrolling.
     *
     * @required
     */
    itemDisplayCount?: number | false;
    /**
     * The number of items in the menu.
     *
     * This is used to determine the maximum height of the menu when `itemDisplayCount` is set to a number.
     *
     * @required
     */
    itemCount?: number;
    /**
     * Whether the menu is rendered as a floating element.
     *
     * @default true
     */
    floating?: boolean;
    /**
     * Whether the menu is hidden.
     *
     * @default false
     */
    hidden?: boolean;
};

/**
 * A container housing a simple list of options presented to the customer to select one option at a time.
 *
 * @example
 *     import React from 'react';
 *
 *     import { Menu } from '@bspk/ui/Menu';
 *
 *     export function Example() {
 *         return (
 *             <Menu>
 *                 <ListItem label="List Item" />
 *             </Menu>
 *         );
 *     }
 *
 * @name Menu
 * @phase DesignReview
 */
function Menu({
    //
    innerRef,
    id: idProp,
    children,
    portal = true,
    itemDisplayCount: itemDisplayCountProp,
    itemCount,
    floating = true,
    hidden = false,
    ...props
}: ElementProps<MenuProps, 'div'>) {
    const menuId = useId(idProp);

    const itemDisplayCount = useMemo(() => {
        return itemDisplayCountProp && boundCount(itemCount, itemDisplayCountProp);
    }, [itemCount, itemDisplayCountProp]);

    useLockBodyScroll(floating && hidden !== true);

    const menu = (
        <div
            role="listbox"
            {...props}
            data-bspk="menu"
            data-floating={floating || undefined}
            id={menuId}
            ref={innerRef}
            style={cssWithVars({
                ...props.style,
                '--overflow-y': itemCount && itemDisplayCount && itemCount > itemDisplayCount ? 'scroll' : undefined,
                maxHeight:
                    itemDisplayCount === false
                        ? 'auto'
                        : `calc(calc(${itemDisplayCount} * var(--item-size)) + 2px /* borders */)`,
            })}
        >
            {children}
        </div>
    );

    return portal ? <Portal>{menu}</Portal> : menu;
}

Menu.bspkName = 'Menu';

export { Menu };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
