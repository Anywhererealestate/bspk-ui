import { ListItem, ListItemProps } from '-/components/ListItem';
import { ElementProps, SetRef } from '-/types/common';
import { cssWithVars } from '-/utils/cwv';

import './list-item-group.scss';

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
     * If false, max height will not be constrained and scrolling will be disabled.
     */
    scrollLimit?: number | false;
    /** A ref callback to receive the container element. */
    innerRef?: SetRef<HTMLElement | undefined>;
    /** The ID of the currently highlighted item. */
    activeElementId?: string | null;
    /** A ref callback to receive the list of item elements. */
    innerRefs?: SetRef<HTMLElement[] | undefined>;
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
    scrollLimit,
    innerRef,
    activeElementId,
    innerRefs,
}: ElementProps<ListItemGroupProps, 'div'>) {
    const maxCount =
        typeof scrollLimit === 'number' && items.length > scrollLimit && scrollLimit > 0 ? scrollLimit : undefined;

    return (
        <div
            data-bspk-utility="list-item-group"
            data-scroll={!!maxCount}
            ref={(node) => {
                if (!node) return;
                innerRef?.(node);
                innerRefs?.(Array.from(node.children) as HTMLElement[]);
            }}
            style={cssWithVars({
                '--max-display-count': maxCount,
            })}
        >
            {items.map((item, index) => (
                <ListItem key={index} {...item} selected={activeElementId === item.id} />
            ))}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
