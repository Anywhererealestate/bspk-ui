import { ReactNode } from 'react';

import { Portal } from './Portal';
import { useId } from './hooks/useId';

import { CommonProps, ElementProps, SetRef } from './';

import './menu.scss';

export function menuItemId(menuId: string, index: number) {
    return `menu-${menuId}-item-${index}`;
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
    ...props
}: ElementProps<MenuProps, 'div'>) {
    const menuId = useId(idProp);

    const menu = (
        <div role="listbox" {...props} data-bspk="menu" id={menuId} ref={innerRef}>
            {children}
        </div>
    );

    return portal ? <Portal>{menu}</Portal> : menu;
}

Menu.bspkName = 'Menu';

export { Menu };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
