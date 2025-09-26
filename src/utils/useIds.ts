import { useMemo } from 'react';

/** A hook that generates unique IDs for a list of items. */
export function useIds<T>(prefix: string, items: T[]): (T & { id: string })[] {
    return useMemo(
        () =>
            items.map((item, index) => ({
                ...item,
                id:
                    item && typeof item === 'object' && 'id' in item && item.id
                        ? String(item.id)
                        : `${prefix}-item-${index}`,
            })),
        [items, prefix],
    );
}
