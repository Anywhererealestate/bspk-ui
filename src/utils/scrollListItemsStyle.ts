import { CSSProperties } from 'react';

export type ScrollListItemsStyleProps = {
    /**
     * The maximum number of ListItems to show before scrolling is enabled.
     *
     * Used in conjunction with scrollListItemsStyle utility.
     */
    scrollLimit?: number;
};

export function scrollListItemsStyle(scrollLimitProp: unknown, itemCount: unknown): CSSProperties {
    const scrollLimit = Number(scrollLimitProp);

    // Check:
    // 1. scrollLimit is valid
    // 2. itemCount is a number
    // 3. scrollLimit is less than itemCount
    // If any of these fail, return undefined (no scrolling)
    if (Number.isNaN(scrollLimit) || scrollLimit <= 0 || typeof itemCount !== 'number' || scrollLimit > itemCount)
        return {};

    return {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: `calc(var(--list-item-height) * ${scrollLimit})`,
        overflow: 'hidden auto',
    };
}
