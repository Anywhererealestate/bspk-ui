// import { ReactNode, useMemo, useRef } from 'react';
import { ReactNode } from 'react';

import { Portal, PortalProps } from '-/components/Portal';
import { useId } from '-/hooks/useId';
import { CommonProps, ElementProps, SetRef } from '-/types/common';

import './menu.scss';

export function menuItemId(menuId: string, index: number) {
    return `menu-${menuId}-item-${index}`;
}

export type MenuProps = CommonProps<'id' | 'owner'> &
    Pick<PortalProps, 'container'> & {
        /** A ref to the inner div element. */
        innerRef?: SetRef<HTMLDivElement>;
        /**
         * The items to display in the menu. These should be ListItem and Divider components.
         *
         * @required
         */
        children: ReactNode;
        /**
         * Whether the menu is rendered as a floating element with a portal or inline.
         *
         * @default false
         */
        inline?: boolean;
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
 *             <Menu scroll={false}>
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
export function Menu({
    //
    innerRef,
    id: idProp,
    children,
    inline = false,
    owner,
    container,
    ...props
}: ElementProps<MenuProps, 'div'>) {
    const menuId = useId(idProp);

    const menu = (
        <>
            <div
                {...props}
                data-bspk-owner={owner || undefined}
                data-bspk-utility="menu"
                data-inline={inline === true || undefined}
                id={menuId}
                ref={(node) => {
                    if (node) innerRef?.(node);
                }}
            >
                {children}
            </div>
        </>
    );

    return !inline ? <Portal container={container}>{menu}</Portal> : menu;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
