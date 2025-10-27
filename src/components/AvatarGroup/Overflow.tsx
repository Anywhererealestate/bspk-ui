import { Avatar, AvatarProps, SizeVariant } from '-/components/Avatar';
import { ListItem } from '-/components/ListItem';
import { Menu } from '-/components/Menu';
import { Portal } from '-/components/Portal';
import { useArrowNavigation } from '-/hooks/useArrowNavigation';
import { useFloating } from '-/hooks/useFloating';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { handleKeyDown } from '-/utils/handleKeyDown';
import { scrollListItemsStyle } from '-/utils/scrollListItemsStyle';
import { useIds } from '-/utils/useIds';

export type AvatarGroupOverflowProps = {
    /** The number of overflow avatars */
    overflow: number;
    /** The size of the avatar group */
    size: SizeVariant;
    /** The avatars in the overflow */
    items: AvatarProps[];
};

export function AvatarGroupOverflow({ items: itemsProp, overflow, size }: AvatarGroupOverflowProps) {
    const items = useIds(`avatar-overflow`, itemsProp);
    const menuId = `avatar-overflow-menu-${items[0]?.id}`;

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

    return (
        <>
            <button
                aria-activedescendant={activeElementId || undefined}
                aria-controls={open ? menuId : undefined}
                aria-expanded={open}
                aria-haspopup="menu"
                aria-hidden
                aria-label={`Show ${overflow} more avatar${overflow > 1 ? 's' : ''}`}
                data-bspk="avatar"
                data-bspk-owner="avatar-overflow"
                data-size={size}
                onBlur={() => closeMenu()}
                onClick={() => setActiveElementId(activeElementId === null ? items[0]?.id : null)}
                onKeyDown={handleKeyDown(arrowKeyCallbacks)}
                ref={elements.setReference}
                role="combobox"
            >
                <span data-overflow-count>+{overflow}</span>
            </button>
            {open && (
                <Portal>
                    <Menu
                        id={menuId}
                        innerRef={elements.setFloating}
                        role="menu"
                        style={{
                            ...floatingStyles,
                            ...scrollListItemsStyle(5, items.length),
                            '--list-item-height': `var(--spacing-sizing-12)`,
                            paddingRight: 'var(--spacing-sizing-04)',
                        }}
                        width="fit-content"
                    >
                        {items.map((item, index) => (
                            <ListItem
                                active={activeElementId === item.id}
                                key={index}
                                label={item.name}
                                leading={<Avatar {...item} hideTooltip size="small" />}
                            />
                        ))}
                    </Menu>
                </Portal>
            )}
        </>
    );
}
