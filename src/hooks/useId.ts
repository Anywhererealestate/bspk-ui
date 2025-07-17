import { useMemo } from 'react';

/**
 * A utility hook that generates a unique id for an element. If a default id is provided, it will use that instead.
 *
 * @param {string | undefined | null} defaultId
 * @returns {string}
 */
export function useId(defaultId?: string | null): string {
    return useMemo(() => {
        return defaultId || generateRandomId(8);
    }, [defaultId]);
}

export function generateRandomId(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
