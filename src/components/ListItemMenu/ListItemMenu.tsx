import { AriaAttributes, CSSProperties, HTMLAttributes, ReactNode, useState, KeyboardEvent } from 'react';
import { ListItemProps as ListItemPropsBase } from '-/components/ListItem';
import { ListItemGroup, ListItemGroupProps } from '-/components/ListItemGroup';
import { Menu } from '-/components/Menu';
import { useFloating, UseFloatingProps } from '-/hooks/useFloating';
import { useId } from '-/hooks/useId';
import { useKeyNavigation } from '-/hooks/useKeyNavigation';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { CommonProps } from '-/types/common';

/** Props for the toggle element that opens the ListItemMenu. */
export type ToggleProps = {
    'aria-errormessage'?: string | undefined;
    'aria-activedescendant'?: string | undefined;
    'aria-controls': string;
    'aria-disabled'?: boolean | undefined;
    'aria-expanded': boolean;
    'aria-haspopup': AriaAttributes['aria-haspopup'];
    'aria-invalid'?: boolean | undefined;
    'aria-owns': string;
    'aria-readonly'?: boolean | undefined;
    role: 'combobox';
    tabIndex: number;
    onClick: () => void;
    onKeyDownCapture: (event: KeyboardEvent) => void;
};

export type InternalToggleProps = { setRef: (element: HTMLElement | null) => void; showMenu: () => void };

/**
 * The items to display in the ListItemMenu.
 *
 * Id is optional, if not provided it will be auto-generated.
 */
export type MenuListItem = Omit<ListItemPropsBase, 'id'> & Required<Pick<ListItemPropsBase, 'id'>>;

export type MenuListItemsFn = (props: { setShow: (show: boolean) => void }) => MenuListItem[];

export type ListItemMenuProps = CommonProps<'disabled' | 'owner' | 'readOnly'> &
    Pick<ListItemGroupProps, 'scrollLimit'> &
    Pick<UseFloatingProps, 'offsetOptions' | 'placement' | 'refWidth'> & {
        /** He children to render inside the menu. */
        children: (toggleProps: ToggleProps, internal: InternalToggleProps) => ReactNode;
        /** The element that the menu is anchored to. */
        menuRole: HTMLAttributes<HTMLElement>['role'];
        /** The css width. */
        menuWidth?: CSSProperties['width'];
        /** The ID of the menu element. */
        menuId?: string;
        /**
         * The items to display in the menu as ListItems.
         *
         * If an item does not have an `id` property, one will be generated automatically.
         */
        items: MenuListItem[] | MenuListItemsFn;
        /**
         * Content to display in the floating menu element after the ListItemGroup.
         *
         * If provided scrollLimit will be ignored.
         */
        menuTrailing?: ReactNode;
        /**
         * Content to display in the floating menu element before the ListItemGroup.
         *
         * If provided scrollLimit will be ignored.
         */
        menuLeading?: ReactNode;
        /** The ID of the currently active element. */
        activeElementId?: string | null;
    };

/**
 * A floating list Item menu for displaying additional actions or options presented as ListItems in a Menu.
 *
 * @example
 *     import { ListItemMenu } from '@bspk/ui/ListItemMenu';
 *
 *     function Example() {
 *         return <ListItemMenu>Example ListItemMenu</ListItemMenu>;
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
    menuRole: role,
    disabled,
    readOnly,
    menuWidth,
    menuId: menuIdProps,
    placement = 'bottom',
    offsetOptions,
    refWidth,
    menuTrailing,
    menuLeading,
    activeElementId: activeElementIdProp = null,
}: ListItemMenuProps) {
    const menuId = useId(menuIdProps);

    const [show, setShow] = useState(false);

    const { floatingStyles, elements, currentPlacement } = useFloating({
        hide: !show,
        offsetOptions,
        placement,
        refWidth,
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
    });

    useOutsideClick({
        elements: [elements.floating as HTMLElement],
        callback: () => {
            setShow(false);
        },
    });

    const items = (typeof itemsProp === 'function' ? itemsProp({ setShow }) : itemsProp).map((item, index) => {
        const itemId = item.id || `list-item-menu-item-${index + 1}`;
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

    if (items.length === 0)
        return children({} as ToggleProps, { setRef: elements.setReference, showMenu: () => setShow(true) });

    return (
        <>
            {children(
                {
                    'aria-activedescendant': activeElementId || undefined,
                    'aria-controls': menuId,
                    'aria-disabled': disabled || undefined,
                    'aria-expanded': show,
                    'aria-haspopup': 'listbox' as AriaAttributes['aria-haspopup'],
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
                    showMenu: () => setShow(true),
                },
            )}
            {show && (
                <Menu
                    data-placement={currentPlacement}
                    id={menuId}
                    innerRef={elements.setFloating}
                    owner={owner}
                    role={role}
                    style={{
                        width: menuWidth,
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
            )}
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
