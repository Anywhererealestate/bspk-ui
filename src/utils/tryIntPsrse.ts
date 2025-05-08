export function tryIntParse(value: number | string | null | undefined): number | null {
    if (value === null || value === undefined) return null;
    const parsed = parseInt(value as string, 10);
    return isNaN(parsed) ? null : parsed;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
