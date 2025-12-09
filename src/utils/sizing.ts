export const SIZING_VALUES = [
    //
    '0',
    '4',
    '8',
    '12',
    '16',
    '20',
    '24',
    '28',
    '32',
    '40',
] as const;

export type SizingPixels = `${(typeof SIZING_VALUES)[number]}`;

export function numToSizingVar(numStrProp?: string): string | undefined {
    if (numStrProp === undefined || ['auto', '0'].includes(numStrProp)) return numStrProp;

    if (!SIZING_VALUES.includes(numStrProp as SizingPixels)) return undefined;

    return `var(--spacing-sizing-${numStrProp.padStart(2, '0')})`;
}
