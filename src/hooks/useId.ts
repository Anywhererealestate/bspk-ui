import { useMemo } from 'react';
import { randomString } from '-/utils/random';

/**
 * A utility hook that generates a unique id for an element. If a default id is provided, it will use that instead.
 *
 * * @param {string | undefined | null} defaultId * * @returns {string}
 */
export function useId(defaultId?: string | null): string {
    return useMemo(() => {
        return defaultId || randomString(8);
    }, [defaultId]);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
