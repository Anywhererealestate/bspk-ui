import './list-item-group.scss';
import { AriaRole } from 'react';
import { ListItem, ListItemProps } from '-/components/ListItem';
import { ElementProps, SetRef } from '-/types/common';
import { cssWithVars } from '-/utils/cwv';

export const SUPPORTED_ROLES = ['listbox', 'menu', 'tree', 'group'] as const;

export type ListItemGroupRole = Extract<AriaRole, (typeof SUPPORTED_ROLES)[number]>;

const LIST_ITEM_ROLES: Record<ListItemGroupRole, AriaRole | undefined> = {
    group: undefined,
    listbox: 'option',
    menu: 'menuitem',
    tree: 'treeitem',
};

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
     * If false, max height will not be constrained and scrolling will be disabled.
     *
     * If true, scrolling will be enabled after 10 items.
     *
     * @default 10
     * @type number
     */
    scrollLimit?: boolean | number;
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
    const maxCount =
        typeof scrollLimit === 'number' && items.length > scrollLimit && scrollLimit > 0 ? scrollLimit : undefined;

    const itemRole = role ? LIST_ITEM_ROLES[role] : undefined;

    return (
        <div
            {...props}
            data-bspk-utility="list-item-group"
            data-scroll={!!maxCount}
            ref={(node) => {
                if (!node) return;
                innerRef?.(node);
                innerRefs?.(Array.from(node.children) as HTMLElement[]);
            }}
            style={cssWithVars({
                ...props.style,
                '--max-display-count': maxCount,
            })}
        >
            {items.map((item, index) => (
                <ListItem key={index} {...item} role={item.role || itemRole} />
            ))}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
