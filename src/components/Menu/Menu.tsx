import './menu.scss';
import { ElementType, ReactNode } from 'react';
import { useId } from '-/hooks/useId';
import { CommonProps, ElementProps, SetRef } from '-/types/common';

export function menuItemId(menuId: string, index: number) {
    return `menu-${menuId}-item-${index}`;
}

export type MenuProps<As extends ElementType = ElementType> = CommonProps<'id' | 'owner' | 'role'> & {
    /** A ref to the inner div element. */
    innerRef?: SetRef<HTMLDivElement>;
    /**
     * The items to display in the menu. These should be ListItem and Divider components.
     *
     * @required
     */
    children: ReactNode;
    /**
     * A label for the menu for screen readers.
     *
     * This is required if the role is set to "menu" or "listbox".
     */
    label?: string;
    /**
     * The element type to render as.
     *
     * @default div
     * @type ElementType
     */
    as?: As;
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
 *                 <ListItem label="List Item" />
 *                 <ListItem label="List Item" />
 *             </Menu>
 *         );
 *     }
 *
 * @name Menu
 * @phase UXReview
 */
export function Menu({ as, innerRef, id: idProp, children, owner, label, ...props }: ElementProps<MenuProps, 'div'>) {
    const menuId = useId(idProp);

    const As = as || 'div';

    return (
        <As
            {...props}
            aria-label={label || undefined}
            data-bspk-owner={owner || undefined}
            data-bspk-utility="menu"
            id={menuId}
            ref={innerRef}
        >
            {children}
        </As>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
