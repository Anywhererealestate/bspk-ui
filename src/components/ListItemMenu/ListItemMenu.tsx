import {
    AriaAttributes,
    CSSProperties,
    HTMLAttributes,
    ReactNode,
    useState,
    KeyboardEvent,
    useMemo,
    MouseEvent,
    Dispatch,
    SetStateAction,
} from 'react';
import { ListItemProps } from '-/components/ListItem';
import { ListItemGroup, ListItemGroupProps, ListItemGroupRole } from '-/components/ListItemGroup';
import { Menu, MenuProps } from '-/components/Menu';
import { Portal } from '-/components/Portal';
import { ArrowKeyNavigationCallbackParams, useArrowNavigation } from '-/hooks/useArrowNavigation';
import { useFloating, UseFloatingProps } from '-/hooks/useFloating';
import { useId } from '-/hooks/useId';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { CommonProps, SetRef } from '-/types/common';
import { getElementById } from '-/utils/dom';
import { handleKeyDown } from '-/utils/handleKeyDown';
import { randomString } from '-/utils/random';

export function useMenuItems<T extends ListItemProps>(menuId: string, items: T[]): (MenuListItem & T)[] {
    return useMemo(
        () =>
            items.map((item) => ({
                ...item,
                id: `${menuId}-item-${randomString(8)}`,
            })),
        [items, menuId],
    );
}

export type MenuListItem = Omit<ListItemProps, 'id'> & {
    id: string;
};

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
        onClick: (event: MouseEvent<HTMLElement>) => void;
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
    /** The number of items in the menu. */
    itemCount: number;
    /** Whether or not the menu is currently open. */
    show?: boolean;
};

export type ListItemMenuProps = CommonProps<'disabled' | 'readOnly'> &
    Pick<ListItemGroupProps, 'scrollLimit'> &
    Pick<MenuProps, 'id' | 'label' | 'owner'> &
    Pick<UseFloatingProps, 'offsetOptions' | 'placement'> & {
        /**
         * The children to render inside the menu.
         *
         * @required
         */
        children: (toggleProps: ToggleProps, internal: InternalToggleProps) => ReactNode;
        /**
         * The element that the menu is anchored to.
         *
         * @default listbox
         */
        role?: ListItemGroupRole;
        /**
         * The width of the menu. If 'reference' is provided, the menu will match the width of the useFloating reference
         * element.
         *
         * @default reference
         */
        width?: CSSProperties['width'] | 'reference';
        /**
         * The items to display in the menu as ListItems.
         *
         * If an item does not have an `id` property, one will be generated automatically.
         *
         * @required
         */
        items: MenuListItem[];
        /**
         * Content to display in the floating menu element before the ListItems.
         *
         * If provided `scrollLimit` will be ignored.
         */
        leading?: ReactNode;
        /**
         * Content to display in the floating menu element after the ListItems.
         *
         * If provided `scrollLimit` will be ignored.
         */
        trailing?: ReactNode;
        /** The ID of the currently active element. */
        activeElementId?: string | null;
        /** Optional callback fired when an item is clicked/selected. */
        onClick?: (params: {
            event: MouseEvent;
            currentId: string;
            show: boolean;
            setShow: Dispatch<SetStateAction<boolean>>;
        }) => void;
        /**
         * Optional callback fired when the arrow keys are used for navigation.
         *
         * If the callback returns `true`, the change is accepted; if it returns `false`, the change is ignored.
         */
        arrowKeyNavigationCallback?: (params: ArrowKeyNavigationCallbackParams) => boolean;
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
 *         return (
 *             <ListItemMenu
 *                 items={[{ id: '1', label: 'Item 1' }]}
 *                 label="Example Menu"
 *                 role="menu"
 *                 scrollLimit={5}
 *                 width="200px"
 *             >
 *                 {(toggleProps, { setRef, toggleMenu }) => (
 *                     <button {...toggleProps} onClick={() => toggleMenu()} ref={setRef}>
 *                         Toggle Menu
 *                     </button>
 *                 )}
 *             </ListItemMenu>
 *         );
 *     }
 *
 * @name ListItemMenu
 * @phase Utility
 */
export function ListItemMenu({
    activeElementId: activeElementIdProp = null,
    children,
    disabled,
    id: idProp,
    items,
    label,
    leading: menuLeading,
    offsetOptions = 4,
    arrowKeyNavigationCallback,
    onClick,
    owner,
    placement = 'bottom',
    readOnly,
    role = 'listbox',
    scrollLimit,
    trailing: menuTrailing,
    width: menuWidth = 'reference',
    ...ariaProps
}: ListItemMenuProps) {
    const containerId = useId(idProp);

    const [show, setShow] = useState(false);

    const { floatingStyles, elements, currentPlacement } = useFloating({
        hide: !show,
        offsetOptions,
        placement,
        refWidth: menuWidth === 'reference',
        strategy: 'fixed',
    });

    useOutsideClick({
        elements: [elements.floating as HTMLElement, elements.reference as HTMLElement],
        callback: () => setShow(false),
        disabled: !show,
    });

    const { activeElementId, setActiveElementId, arrowKeyCallbacks } = useArrowNavigation({
        ids: items.flatMap((item) => (item.disabled ? [] : item.id)),
        callback: (params) => {
            if (!show) setShow(true);

            if (typeof arrowKeyNavigationCallback === 'function' && arrowKeyNavigationCallback)
                return arrowKeyNavigationCallback(params);
            return true;
        },
    });

    if (items.length === 0 && !menuLeading && !menuTrailing)
        return children({} as ToggleProps, {
            setRef: elements.setReference,
            toggleMenu: (force) =>
                setShow((prev) => {
                    if (typeof force === 'boolean') return force;
                    return !prev;
                }),
            itemCount: 0,
        });

    const tabEscape = () => {
        setShow(false);
        setActiveElementId(null);
    };

    return (
        <>
            {children(
                {
                    'aria-disabled': disabled || undefined,
                    'aria-expanded': show,
                    'aria-haspopup': show && role !== 'group' ? role : undefined,
                    'aria-controls': show ? containerId : undefined,
                    'aria-readonly': readOnly || undefined,
                    'aria-owns': containerId,
                    'aria-activedescendant': show ? activeElementId || undefined : undefined,
                    role: 'combobox',
                    tabIndex: 0,
                    onClick: (event) => {
                        const nextShow = !show;
                        setShow(nextShow);
                        setActiveElementId(nextShow ? activeElementIdProp || items[0]?.id || null : null);
                        event.preventDefault();
                    },
                    onKeyDownCapture: handleKeyDown({
                        ...arrowKeyCallbacks,
                        Enter: (event) => {
                            event.preventDefault();
                            if (!show) {
                                setShow(true);
                                return;
                            }
                            getElementById(activeElementId)?.click();
                        },
                        Space: (event) => {
                            event.preventDefault();
                            if (!show) {
                                setShow(true);
                                return;
                            }
                            getElementById(activeElementId)?.click();
                        },
                        Tab: tabEscape,
                        Escape: tabEscape,
                    }),
                },
                {
                    setRef: elements.setReference,
                    toggleMenu: () => setShow(true),
                    itemCount: items.length,
                },
            )}
            {show && (
                <Portal>
                    <Menu
                        data-placement={currentPlacement}
                        innerRef={(node) => {
                            elements.setFloating(node);
                        }}
                        owner={owner}
                        style={{
                            width: menuWidth !== 'reference' ? menuWidth : undefined,
                            ...floatingStyles,
                        }}
                        {...ariaProps}
                        role="presentation"
                    >
                        {menuLeading}
                        <ListItemGroup
                            aria-label={label}
                            id={containerId}
                            items={items.map((item) => ({
                                ...item,
                                tabIndex: 0,
                                onClick: (event) => {
                                    elements.reference?.focus();
                                    setActiveElementId(item.id);
                                    item?.onClick?.(event);
                                    onClick?.({ event, currentId: item.id, show, setShow });
                                },
                                active: activeElementId === item.id || undefined,
                            }))}
                            role={role}
                            scrollLimit={!menuLeading && !menuTrailing ? scrollLimit : undefined}
                        />
                        {menuTrailing}
                    </Menu>
                </Portal>
            )}
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
