export type ColorVariant =
    | 'blue'
    | 'green'
    | 'grey'
    | 'lime'
    | 'magenta'
    | 'orange'
    | 'pink'
    | 'primary'
    | 'purple'
    | 'red'
    | 'secondary'
    | 'teal'
    | 'white'
    | 'yellow';

export const COLOR_VARIABLES: Record<ColorVariant, { foreground: string; surface: string }> = {
    grey: {
        foreground: '--foreground-neutral-on-surface-variant-01',
        surface: '--surface-neutral-t2-lowest',
    },
    white: {
        foreground: '--foreground-neutral-on-surface-variant-01',
        surface: '--surface-neutral-t1-base',
    },
    primary: {
        foreground: '--foreground-brand-primary-depth',
        surface: '--surface-brand-primary-highlight',
    },
    secondary: {
        foreground: '--foreground-brand-secondary-depth',
        surface: '--surface-brand-secondary-highlight',
    },
    blue: {
        foreground: '--foreground-spectrum-blue',
        surface: '--surface-spectrum-blue',
    },
    green: {
        foreground: '--foreground-spectrum-green',
        surface: '--surface-spectrum-green',
    },
    lime: {
        foreground: '--foreground-spectrum-lime',
        surface: '--surface-spectrum-lime',
    },
    magenta: {
        foreground: '--foreground-spectrum-magenta',
        surface: '--surface-spectrum-magenta',
    },
    orange: {
        foreground: '--foreground-spectrum-orange',
        surface: '--surface-spectrum-orange',
    },
    pink: {
        foreground: '--foreground-spectrum-pink',
        surface: '--surface-spectrum-pink',
    },
    purple: {
        foreground: '--foreground-spectrum-purple',
        surface: '--surface-spectrum-purple',
    },
    red: {
        foreground: '--foreground-spectrum-red',
        surface: '--surface-spectrum-red',
    },
    teal: {
        foreground: '--foreground-spectrum-teal',
        surface: '--surface-spectrum-teal',
    },
    yellow: {
        foreground: '--foreground-spectrum-yellow',
        surface: '--surface-spectrum-yellow',
    },
} as const;
