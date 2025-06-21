import { ReactNode } from 'react';

import { useId } from './hooks/useId';

import { CommonProps, ElementProps, SetRef } from './';

import './menu.scss';
import { Portal } from './Portal';

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
function Menu({ innerRef, id: idProp, children, ...props }: ElementProps<MenuProps, 'div'>) {
    const menuId = useId(idProp);

    return (
        <Portal>
            <div role="menu" {...props} data-bspk="menu" id={menuId} ref={innerRef}>
                {children}
            </div>
        </Portal>
    );
}

Menu.bspkName = 'Menu';

export { Menu };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
