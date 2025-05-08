/**
 * This function returns an object with a `data-sr-only` attribute if the `hide` parameter is true.
 *
 * This is useful for hiding content visually but keeping it accessible to screen readers.
 *
 * @param hide
 * @returns An object with a `data-sr-only` attribute if the `hide` parameter is true
 */

export function srOnly(hide: unknown) {
    return hide ? { 'data-sr-only': true } : {};
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
