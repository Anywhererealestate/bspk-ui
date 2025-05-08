import { css } from '@emotion/react';
import { ReactNode, useMemo } from 'react';

import { COLOR_VARIABLES, ColorVariant } from './utils/colorVariants';

import { CommonProps } from '.';

export type SizeVariant =
    | 'large'
    | 'medium'
    | 'small'
    | 'x-large'
    | 'x-small'
    | 'xx-large'
    | 'xxx-large'
    | 'xxxx-large'
    | 'xxxxx-large';

const SIZE_VARIANTS: Record<SizeVariant, { height: string; font: string }> = {
    'x-small': { font: '--labels-x-small', height: '--spacing-sizing-06' }, // 24
    small: { font: '--labels-small', height: '--spacing-sizing-08' }, // 32,
    medium: { font: '--labels-base', height: '--spacing-sizing-10' }, // 40
    large: { font: '--labels-large', height: '--spacing-sizing-12' }, //48,
    'x-large': { font: '--desktop-subheader-x-large', height: '--spacing-sizing-14' }, // 56,
    'xx-large': { font: '--desktop-subheader-xx-large', height: '--spacing-sizing-17' }, // 72,
    'xxx-large': { font: '--desktop-display-regular-small', height: '--spacing-sizing-19' }, //96,
    'xxxx-large': { font: '--desktop-display-regular-medium', height: '--spacing-sizing-21' }, // 120,
    'xxxxx-large': { font: '--desktop-display-regular-large', height: '--spacing-sizing-23' }, //144,
};

export type ProfileProps = CommonProps<'aria-label'> & {
    /**
     * The size of the profile.
     *
     * @default small
     */
    size?: SizeVariant;
    /**
     * The color of the profile.
     *
     * @default grey
     */
    color?: ColorVariant;
    /** The initials to display in the profile limited to 2 characters. */
    initials?: string;
    /** The icon to display in the profile. */
    icon?: ReactNode;
    /** The url to the image to display in the profile. */
    image?: string;
    /** The number of notifications not displayed in a list. */
    overflowCount?: number;
};

/**
 * A profile component.
 *
 * A profile is a visual representation of a user or entity. It can be used to display an initials, icon, image, or an
 * overflowCount.
 *
 * @name Profile
 */
function Profile({
    initials,
    color = 'grey',
    size = 'small',
    icon,
    image,
    'aria-label': ariaLabel,
    overflowCount,
}: ProfileProps) {
    const children = useMemo(() => {
        if (initials) return <span data-initials>{initials}</span>;
        if (icon) return <span data-icon>{icon}</span>;
        if (image) return <img alt={ariaLabel} src={image} />;
        if (overflowCount) return <span data-overflow-count>+{overflowCount}</span>;
        return null;
    }, [ariaLabel, icon, image, initials, overflowCount]);

    return (
        <>
            {children && (
                <div aria-label={ariaLabel} css={style} data-color={color} data-profile="" data-size={size}>
                    {children}
                </div>
            )}
        </>
    );
}

Profile.bspkName = 'Profile';

export { Profile };

export const style = css`
    --height: var(--spacing-sizing-10);
    --font: var(--labels-base);
    --foreground: var(--foreground-neutral-on-surface);
    --background: var(--surface-neutral-t3-low);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    height: var(--height);
    width: var(--height);
    aspect-ratio: 1 / 1;
    border-radius: 999px;
    background-color: var(--background);
    color: var(--foreground);
    font: var(--font);

    &:has(img) {
        overflow: hidden;
    }

    img {
        max-width: 100%;
    }

    ${Object.entries(SIZE_VARIANTS).map(
        ([variant, { height, font }]) => css`
            &[data-size='${variant}'] {
                --height: var(${height});
                --font: var(${font});
            }
        `,
    )}

    ${Object.entries(COLOR_VARIABLES).map(
        ([variant, { foreground, surface }]) => css`
            &[data-color='${variant}'] {
                --foreground: var(${foreground});
                --background: var(${surface});
            }
        `,
    )};
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
