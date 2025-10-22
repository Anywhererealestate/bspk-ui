import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgMoreHoriz } from '@bspk/icons/MoreHoriz';
import { Button } from '-/components/Button';
import { ListItem } from '-/components/ListItem';
import { Menu } from '-/components/Menu';
import { useArrowNavigation } from '-/hooks/useArrowNavigation';
import { useFloating } from '-/hooks/useFloating';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { getElementById } from '-/utils/dom';
import { handleKeyDown } from '-/utils/handleKeyDown';
import { scrollListItemsStyle, ScrollListItemsStyleProps } from '-/utils/scrollListItemsStyle';
import { useIds } from '-/utils/useIds';

export type BreadcrumbItem = {
    /**
     * The label of the breadcrumb item.
     *
     * @example
     *     Page 1
     *
     * @required
     */
    label: string;
    /**
     * The href of the breadcrumb item.
     *
     * @example
     *     https://bspk.anywhere.re
     *
     * @required
     */
    href: string;
};

type BreadcrumbDropdownProps = ScrollListItemsStyleProps & {
    items: BreadcrumbItem[];
    id: string;
};

export function BreadcrumbDropdown({ items: itemsProp, id, scrollLimit }: BreadcrumbDropdownProps) {
    const menuId = `${id}-menu`;

    const items = useIds(`breadcrumb-${id}`, itemsProp);

    const { activeElementId, setActiveElementId, arrowKeyCallbacks } = useArrowNavigation({
        ids: items.map((i) => i.id),
    });

    const closeMenu = () => setActiveElementId(null);
    const open = Boolean(activeElementId);

    const { elements, floatingStyles } = useFloating({
        hide: !open,
        offsetOptions: 4,
        refWidth: false,
    });

    useOutsideClick({
        elements: [elements.floating, elements.reference],
        callback: () => closeMenu(),
        disabled: !open,
    });

    const spaceEnter = () => {
        if (!open) {
            elements.reference?.click();
            return;
        }
        if (activeElementId) getElementById(activeElementId)?.click();
    };

    return (
        <li>
            <Button
                aria-activedescendant={open ? activeElementId || undefined : undefined}
                aria-controls={open ? menuId : undefined}
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-owns={menuId}
                icon={<SvgMoreHoriz />}
                iconOnly
                innerRef={elements.setReference}
                label={`Access to ${items.length} pages`}
                name={`${name}-country-code`}
                onBlur={() => closeMenu()}
                onClick={(event) => {
                    const nextOpen = !open;
                    if (nextOpen) {
                        setActiveElementId(items[0]?.id || null);
                    } else {
                        setActiveElementId(null);
                    }
                    event.preventDefault();
                }}
                onKeyDown={handleKeyDown(
                    {
                        ...arrowKeyCallbacks,
                        ArrowDown: (event) => {
                            if (!open) spaceEnter();
                            arrowKeyCallbacks.ArrowDown?.(event);
                        },
                        Space: spaceEnter,
                        Enter: spaceEnter,
                        Escape: closeMenu,
                        'Ctrl+Option+Space': spaceEnter,
                    },
                    { preventDefault: true, stopPropagation: true },
                )}
                role="combobox"
                size="small"
                variant="tertiary"
            />
            {open && (
                <Menu
                    id={menuId}
                    innerRef={elements.setFloating}
                    label="Expanded breadcrumb"
                    onBlur={() => closeMenu()}
                    owner="Breadcrumb"
                    role="menu"
                    style={{
                        ...scrollListItemsStyle(scrollLimit, items.length),
                        ...floatingStyles,
                        width: 'fit-content',
                        maxWidth: '300px',
                        minWidth: '150px',
                    }}
                >
                    {items.map((item) => (
                        <ListItem key={item.id} {...item} active={activeElementId === item.id} tabIndex={-1} />
                    ))}
                </Menu>
            )}
            <SvgChevronRight aria-hidden />
        </li>
    );
}
