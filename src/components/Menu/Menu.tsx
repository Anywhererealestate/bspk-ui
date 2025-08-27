// import { ReactNode, useMemo, useRef } from 'react';
import { HTMLAttributes, ReactNode, useRef } from 'react';

import { Portal, PortalProps } from '-/components/Portal';
import { useId } from '-/hooks/useId';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { CommonProps, ElementAttributes, SetRef } from '-/types/common';
import { cssWithVars } from '-/utils/cwv';

import './menu.scss';

export function menuItemId(menuId: string, index: number) {
    return `menu-${menuId}-item-${index}`;
}

export type MenuProps = CommonProps<'id' | 'owner'> &
    ElementAttributes<'div'> &
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
         * Should the menu be rendered in a portal? This is useful for menus that need to be rendered outside of the
         * normal DOM flow, such as dropdowns or modals.
         *
         * @default true
         */
        portal?: boolean;
        /**
         * The number of items to show in the menu. This is used to determine the height of the menu.
         *
         * @default 1
         */
        itemDisplayCount?: number;
        /**
         * The number of items in the menu.
         *
         * @default 1
         */
        itemCount?: number;
        /**
         * Whether the menu is rendered as a floating element.
         *
         * @default true
         */
        floating?: boolean;
        /**
         * A function that is called when the user clicks outside of the menu.
         *
         * @required
         */
        onOutsideClick: () => void;
        /**
         * Whether or not the menu is scrollable.
         *
         * Setting to false will override itemDisplayCount.
         *
         * @default true
         */
        scroll?: boolean;
        /**
         * The [WIA-ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles) of the
         * menu.
         *
         * @default listbox
         */
        role?: HTMLAttributes<'div'>['role'];
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
    portal = true,
    itemDisplayCount = 1,
    itemCount = 1,
    floating = true,
    onOutsideClick,
    owner,
    scroll = true,
    container,
    elementAttributes,
    style,
}: MenuProps) {
    const menuId = useId(idProp);

    const menuElement = useRef(null as HTMLDivElement | null);

    const scrollDefault = scroll === true && itemCount > itemDisplayCount;

    useOutsideClick({
        elements: [menuElement.current],
        callback: () => onOutsideClick?.(),
        disabled: !onOutsideClick,
    });

    const menu = (
        <>
            <div
                {...elementAttributes}
                data-bspk="menu"
                data-bspk-owner={owner || undefined}
                data-floating={floating || undefined}
                data-scroll={scroll || scrollDefault || undefined}
                id={menuId}
                ref={(node) => {
                    innerRef?.(node);
                    menuElement.current = node;
                }}
                style={cssWithVars({
                    ...style,
                    '--item-display-count': itemDisplayCount,
                })}
            >
                {children}
            </div>
        </>
    );

    return portal ? <Portal container={container}>{menu}</Portal> : menu;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
