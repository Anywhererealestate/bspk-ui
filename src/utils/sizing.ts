export type SizingPixels = '0' | '4' | '8' | '12' | '16' | '20' | '24' | '28' | '32' | '40';

export function numToSizingVar(gapProp?: string, defaultValue?: SizingPixels): string | undefined {
    const gap = gapProp || defaultValue || '0';

    const num = parseInt(gap, 10);
    const quarter = num && !Number.isNaN(num) ? Math.max(1, Math.round(num / 4)) : 0;

    return quarter === 0 ? '0' : `var(--spacing-sizing-${String(quarter).padStart(2, '0')})`;
}
