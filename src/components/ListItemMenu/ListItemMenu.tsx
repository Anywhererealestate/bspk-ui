import { AriaAttributes, CSSProperties, HTMLAttributes, ReactNode, useState, KeyboardEvent, useEffect } from 'react';
import { ListItemProps as ListItemPropsBase } from '-/components/ListItem';
import { ListItemGroup, ListItemGroupProps } from '-/components/ListItemGroup';
import { Menu } from '-/components/Menu';
import { Portal } from '-/components/Portal';
import { useFloating, UseFloatingProps } from '-/hooks/useFloating';
import { useId } from '-/hooks/useId';
import { useKeyNavigation } from '-/hooks/useKeyNavigation';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { CommonProps, SetRef } from '-/types/common';
import { KeysCallback } from '-/utils/handleKeyDown';

/** Props for the toggle element that opens the ListItemMenu. */
export type ToggleProps = Pick<
    AriaAttributes,
    | 'aria-activedescendant'
    | 'aria-controls'
    | 'aria-disabled'
    | 'aria-errormessage'
    | 'aria-expanded'
    | 'aria-haspopup'
    | 'aria-invalid'
    | 'aria-owns'
    | 'aria-readonly'
> &
    Pick<HTMLAttributes<HTMLElement>, 'role' | 'tabIndex'> & {
        /** Event handler for the toggle element that change the menu state. */
        onClick: () => void;
        /** Event handler for keydown events on the toggle element that change the menu state. */
        onKeyDownCapture: (event: KeyboardEvent) => void;
    };

/** Props for internal toggle functionality provided to the children render prop. */
export type InternalToggleProps = {
    /**
     * Sets a ref to the toggle element that opens the ListItemMenu.
     *
     * Used in determining the position of the floating menu.
     *
     * May also be used to set the menu width if `width="reference"` is provided in the ListItemMenu props.
     */
    setRef: SetRef<HTMLElement | null>;
    /**
     * Function to toggle the menu open or closed.
     *
     * If `force` is provided as a boolean, it will set the menu to that state (true = open, false = closed). If `force`
     * is not provided, it will toggle the current state.
     */
    toggleMenu: (force?: boolean) => void;
};

/**
 * The items to display in the ListItemMenu.
 *
 * Id is optional, if not provided it will be auto-generated.
 */
export type MenuListItem = Omit<ListItemPropsBase, 'id'> & Required<Pick<ListItemPropsBase, 'id'>>;

export type MenuListItemsFn = (props: { setShow: (show: boolean) => void }) => MenuListItem[];

export type ListItemMenuProps = CommonProps<'disabled' | 'id' | 'owner' | 'readOnly'> &
    Pick<ListItemGroupProps, 'scrollLimit'> &
    Pick<UseFloatingProps, 'offsetOptions' | 'placement'> & {
        /** He children to render inside the menu. */
        children: (toggleProps: ToggleProps, internal: InternalToggleProps) => ReactNode;
        /** The element that the menu is anchored to. */
        role: HTMLAttributes<HTMLElement>['role'];
        /**
         * The width of the menu. If 'reference' is provided, the menu will match the width of the useFloating reference
         * element.
         */
        width?: CSSProperties['width'] | 'reference';
        /**
         * The items to display in the menu as ListItems.
         *
         * If an item does not have an `id` property, one will be generated automatically.
         */
        items: MenuListItem[] | MenuListItemsFn;
        /**
         * Content to display in the floating menu element before the ListItemGroup.
         *
         * If provided `scrollLimit` will be ignored.
         */
        leading?: ReactNode;
        /**
         * Content to display in the floating menu element after the ListItemGroup.
         *
         * If provided `scrollLimit` will be ignored.
         */
        trailing?: ReactNode;
        /** The ID of the currently active element. */
        activeElementId?: string | null;
        keyOverrides?: KeysCallback;
    };

/**
 * A floating list Item menu for displaying additional actions or options presented as ListItems in a Menu.
 *
 * Includes keyboard navigation and accessibility features.
 *
 * The menu is anchored to a reference element provided as a children function with params that include the necessary
 * ARIA attributes and event handlers.
 *
 * @example
 *     import { ListItemMenu } from '@bspk/ui/ListItemMenu';
 *
 *     function Example() {
 *     return <ListItemMenu items={[]}>({ toggleProps, {setRef, toggleMenu} }) => (
 *     <button {...toggleProps} ref={setRef} onClick={() => toggleMenu()}>Toggle Menu</button>
 *     )}</ListItemMenu>;
 *     }
 *
 * @name ListItemMenu
 * @phase Utility
 */
export function ListItemMenu({
    items: itemsProp,
    scrollLimit,
    children,
    owner,
    role: role,
    disabled,
    readOnly,
    width: menuWidth,
    id: menuIdProps,
    placement = 'bottom',
    offsetOptions,
    trailing: menuTrailing,
    leading: menuLeading,
    activeElementId: activeElementIdProp = null,
    keyOverrides,
}: ListItemMenuProps) {
    const menuId = useId(menuIdProps);

    const [show, setShow] = useState(false);

    const { floatingStyles, elements, currentPlacement } = useFloating({
        hide: !show,
        offsetOptions,
        placement,
        refWidth: menuWidth === 'reference',
        strategy: 'fixed',
    });

    const { handleKeyDown, setActiveElementId, setElements, activeElementId } = useKeyNavigation({
        Tab: () => {
            setShow(false);
            setActiveElementId(null);
        },
        Escape: () => {
            setShow(false);
            setActiveElementId(null);
        },
        ...keyOverrides,
    });

    useEffect(() => setActiveElementId(null), [itemsProp, setActiveElementId]);

    useOutsideClick({
        elements: [elements.floating as HTMLElement],
        callback: () => {
            setShow(false);
        },
    });

    const items = (typeof itemsProp === 'function' ? itemsProp({ setShow }) : itemsProp).map((item, index) => {
        const itemId = item.id || `list-item-menu-${menuId}-item-${index + 1}`;
        return {
            ...item,
            id: itemId,
            onClick: (event) => {
                item.onClick?.(event);
                elements.reference?.focus();
                setActiveElementId(itemId);
            },
            tabIndex: 0,
        } as MenuListItem;
    });

    if (items.length === 0 && !menuLeading && !menuTrailing)
        return children({} as ToggleProps, {
            setRef: elements.setReference,
            toggleMenu: (force) =>
                setShow((prev) => {
                    if (typeof force === 'boolean') return force;
                    return !prev;
                }),
        });

    return (
        <>
            {children(
                {
                    'aria-activedescendant': activeElementId || undefined,
                    'aria-controls': (show && menuId) || undefined,
                    'aria-disabled': disabled || undefined,
                    'aria-expanded': show,
                    'aria-haspopup': true,
                    'aria-owns': menuId,
                    'aria-readonly': readOnly || undefined,
                    role: 'combobox',
                    tabIndex: 0,
                    onClick: () => {
                        const nextShow = !show;
                        setShow(nextShow);
                        const nextActiveId = activeElementIdProp || items[0]?.id || null;
                        setActiveElementId(nextShow ? nextActiveId : null);
                    },
                    onKeyDownCapture: (event: KeyboardEvent) => {
                        const code = handleKeyDown(event);
                        if (code?.startsWith('Arrow') && !show) {
                            setShow(true);
                            event.preventDefault();
                        }
                    },
                },
                {
                    setRef: elements.setReference,
                    toggleMenu: () => setShow(true),
                },
            )}
            {show && (
                <Portal>
                    <Menu
                        data-placement={currentPlacement}
                        id={menuId}
                        innerRef={elements.setFloating}
                        owner={owner}
                        role={role}
                        style={{
                            width: menuWidth !== 'reference' ? menuWidth : undefined,
                            ...floatingStyles,
                        }}
                        tabIndex={-1}
                    >
                        {menuLeading}
                        <ListItemGroup
                            activeElementId={activeElementId}
                            innerRefs={setElements}
                            items={items}
                            scrollLimit={!menuLeading && !menuTrailing && scrollLimit}
                        />
                        {menuTrailing}
                    </Menu>
                </Portal>
            )}
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
