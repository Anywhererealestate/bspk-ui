export const SIZING_VALUES = [
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
    '44',
    '48',
    '52',
    '56',
    '60',
    '64',
    '68',
    '72',
] as const;

export type SizingPixels = `${(typeof SIZING_VALUES)[number]}`;

export function numToSizingVar(numStr?: string): string | undefined {
    if (numStr === undefined || ['auto', '0'].includes(numStr)) return numStr;

    if (!SIZING_VALUES.includes(numStr as SizingPixels)) return undefined;

    return `var(--spacing-sizing-${(Number(numStr) / 4).toString().padStart(2, '0')})`;
}
