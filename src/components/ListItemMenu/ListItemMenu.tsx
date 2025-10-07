import {
    AriaAttributes,
    CSSProperties,
    HTMLAttributes,
    ReactNode,
    useState,
    KeyboardEvent,
    MouseEvent,
    Dispatch,
    SetStateAction,
    useMemo,
} from 'react';
import { ListItem, ListItemProps } from '-/components/ListItem';
import { Menu, MenuProps } from '-/components/Menu';
import { ArrowKeyNavigationCallbackParams, useArrowNavigation } from '-/hooks/useArrowNavigation';
import { useFloating, UseFloatingProps } from '-/hooks/useFloating';
import { useId } from '-/hooks/useId';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { CommonProps, SetRef } from '-/types/common';
import { getElementById } from '-/utils/dom';
import { handleKeyDown } from '-/utils/handleKeyDown';
import { scrollListItemsStyle } from '-/utils/scrollListItemsStyle';

export type MenuListItem = Omit<ListItemProps, 'id'> & {
    id: string;
};

export type ListItemMenuRole = keyof typeof LIST_ITEM_ROLES;

const LIST_ITEM_ROLES = {
    group: undefined,
    listbox: 'option',
    menu: 'menuitem',
    tree: 'treeitem',
} as const;

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
    /** The reference element the menu is anchored to. */
    reference: HTMLElement | null;
};

export type ListItemMenuProps = CommonProps<'disabled' | 'readOnly' | 'scrollLimit'> &
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
        role?: ListItemMenuRole;
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
        items: MenuListItem[] | ((params: { show?: boolean }) => MenuListItem[]);
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
        itemOnClick?: (params: {
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
        /** Optional callback fired when the menu is closed. */
        onClose?: () => void;
        /** Remove menu from dom when closed for performance and to prevent tabbing to hidden menu items. */
        hideWhenClosed?: boolean;
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
    items: itemsProp,
    label,
    leading: menuLeading,
    offsetOptions = 4,
    arrowKeyNavigationCallback,
    itemOnClick,
    owner,
    placement = 'bottom',
    readOnly,
    role: containerRole = 'listbox',
    scrollLimit,
    trailing: menuTrailing,
    width: menuWidth = 'reference',
    onClose,
    hideWhenClosed = false,
    ...ariaProps
}: ListItemMenuProps) {
    const containerId = useId(idProp);

    const [show, setShowBase] = useState(false);

    const items = useMemo(() => (typeof itemsProp === 'function' ? itemsProp({ show }) : itemsProp), [itemsProp, show]);

    const setShow = (next: boolean | ((prev: boolean) => boolean)) => {
        if (disabled || readOnly) return;

        setShowBase((prev) => {
            if (prev && !next) {
                // closing
                onClose?.();
            }

            if (typeof next === 'function') return next(prev);
            return next;
        });
    };

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

    const tabEscape = () => {
        setShow(false);
        setActiveElementId(null);
    };

    const enterSpace = (event: KeyboardEvent) => {
        event.preventDefault();
        if (!show) {
            setShow(true);
            return;
        }
        getElementById(activeElementId)?.click();
    };

    return (
        <>
            {children(
                {
                    'aria-disabled': disabled || undefined,
                    'aria-expanded': show,
                    'aria-haspopup': show && containerRole !== 'group' ? containerRole : undefined,
                    'aria-controls': containerId,
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
                        Enter: enterSpace,
                        Space: enterSpace,
                        Tab: tabEscape,
                        Escape: tabEscape,
                    }),
                },
                {
                    setRef: elements.setReference,
                    toggleMenu: () => setShow(true),
                    itemCount: items.length,
                    reference: elements.reference as HTMLElement | null,
                },
            )}
            {(!hideWhenClosed || show) && (
                <Menu
                    {...ariaProps}
                    aria-label={label}
                    data-placement={currentPlacement}
                    data-scroll={!!scrollLimit && items.length > scrollLimit}
                    id={containerId}
                    innerRef={(node) => {
                        elements.setFloating(node);
                    }}
                    owner={owner}
                    role={containerRole}
                    style={{
                        width: menuWidth !== 'reference' ? menuWidth : undefined,
                        ...floatingStyles,
                        ...scrollListItemsStyle(scrollLimit, items.length),
                    }}
                >
                    {menuLeading}
                    {items.map((item, index) => {
                        return (
                            <ListItem
                                key={index}
                                {...item}
                                active={activeElementId === item.id || undefined}
                                onClick={(event) => {
                                    elements.reference?.focus();
                                    setActiveElementId(item.id);
                                    item?.onClick?.(event);
                                    itemOnClick?.({ event, currentId: item.id, show, setShow });
                                }}
                                role={item.role || LIST_ITEM_ROLES[containerRole] || undefined}
                                tabIndex={-1}
                            />
                        );
                    })}
                    {menuTrailing}
                </Menu>
            )}
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
