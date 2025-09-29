import './list-item-group.scss';
import { ListItem, ListItemProps } from '-/components/ListItem';
import { ElementProps, SetRef } from '-/types/common';
import { cssWithVars } from '-/utils/cwv';

export type ListItemGroupRole = keyof typeof LIST_ITEM_ROLES;

const LIST_ITEM_ROLES = {
    group: undefined,
    listbox: 'option',
    menu: 'menuitem',
    tree: 'treeitem',
} as const;

export type ListItemGroupProps = {
    /**
     * The items to display in the group.
     *
     * @required
     */
    items: ListItemProps[];
    /**
     * The maximum number of items to display before enabling scrolling.
     *
     * If the number of items is less than the scrollLimit, scrolling will be disabled.
     *
     * If not provided, the scrolling will be enabled when there are more than 10 items.
     *
     * To disable scrolling, set to `0`.
     *
     * @default 10
     */
    scrollLimit?: number;
    /** A ref callback to receive the container element. */
    innerRef?: SetRef<HTMLElement | undefined>;
    /** A ref callback to receive the list of item elements. */
    innerRefs?: SetRef<HTMLElement[] | undefined>;
    /** The ARIA role of the list item group. */
    role?: ListItemGroupRole;
};

/**
 * A simple wrapper component for grouping ListItem components. It provides a consistent structure and styling for
 * grouped list items including scrolling behavior.
 *
 * @example
 *     import { ListItemGroup } from '@bspk/ui/ListItemGroup';
 *
 *     function Example() {
 *         return <ListItemGroup items={[]} />;
 *     }
 *
 * @name ListItemGroup
 * @phase Utility
 */
export function ListItemGroup({
    items,
    scrollLimit = 10,
    innerRef,
    innerRefs,
    role,
    ...props
}: ElementProps<ListItemGroupProps, 'div'>) {
    const maxDisplayCount = scrollLimitLogic(scrollLimit, items?.length);

    const itemRole = role ? LIST_ITEM_ROLES[role] : undefined;

    return (
        <div
            {...props}
            data-bspk-utility="list-item-group"
            data-scroll={!!maxDisplayCount}
            ref={(node) => {
                if (!node) return;
                innerRef?.(node);
                innerRefs?.(Array.from(node.children) as HTMLElement[]);
            }}
            role={role}
            style={cssWithVars({
                ...props.style,
                '--max-display-count': maxDisplayCount,
            })}
        >
            {items.map((item, index) => (
                <ListItem key={index} {...item} role={item.role || itemRole} />
            ))}
        </div>
    );
}

const scrollLimitLogic = (scrollLimitProp: unknown, itemCount: unknown) => {
    const scrollLimit = Number(scrollLimitProp);

    // Check:
    // 1. scrollLimit is valid
    // 2. itemCount is a number
    // 3. scrollLimit is less than itemCount
    // If any of these fail, return undefined (no scrolling)
    if (Number.isNaN(scrollLimit) || scrollLimit <= 0 || typeof itemCount !== 'number' || scrollLimit > itemCount)
        return undefined;

    return scrollLimit;
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
