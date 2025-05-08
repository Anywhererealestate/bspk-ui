import { css } from '@emotion/react';
import { ElementType, ReactNode } from 'react';

import { ColorVariant, COLOR_VARIABLES } from './utils/colorVariants';

import { ElementProps } from './';

export type TagProps<As extends ElementType = 'span'> = {
    /**
     * The element type to render as.
     *
     * @default span
     * @type ElementType
     */
    as?: As;
    /**
     * The content of the tag.
     *
     * @required
     */
    children: ReactNode;
    /**
     * The size of the tag.
     *
     * @default small
     */
    size?: 'small' | 'x-small';
    /**
     * The color of the tag.
     *
     * @default white
     */
    color?: ColorVariant;
    /**
     * The display variant of the tag.
     *
     * @default flat
     */
    variant?: 'corner-wrap' | 'flat' | 'pill';
    /**
     * Whether the tag should wrap its content.
     *
     * (Not recommended)
     *
     * @default false
     */
    wrap?: boolean;
};

/**
 * A non-interactive visual indicators to draw attention or categorization of a component.
 *
 * @name Tag
 */
function Tag<As extends ElementType = 'span'>({
    children,
    as,
    color = 'white',
    size = 'small',
    variant = 'flat',
    wrap,
    ...props
}: ElementProps<TagProps<As>, As>) {
    const As: ElementType = as || 'span';

    return (
        <As
            {...props}
            css={style}
            data-color={color}
            data-size={size}
            data-tag
            data-variant={variant}
            data-wrap={wrap || undefined}
        >
            {children}
            {variant === 'corner-wrap' && <div data-triangle />}
        </As>
    );
}

Tag.bspkName = 'Tag';

export { Tag };

export const style = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: fit-content;
    position: relative;
    padding: 0 var(--spacing-sizing-03);
    border-radius: var(--radius-small);
    color: var(--foreground) !important;
    background: var(--background);
    text-decoration: none;
    font: unset;
    text-decoration: unset;
    white-space: nowrap;

    &[data-wrap] {
        height: auto;
    }

    &[data-variant='pill'] {
        border-radius: var(--radius-circular);
    }

    &[data-variant='corner-wrap'] {
        border-bottom-right-radius: 0;
    }

    ${Object.entries(COLOR_VARIABLES).map(
        ([variant, { foreground, surface }]) => css`
            &[data-color='${variant}'] {
                --foreground: var(${foreground});
                --background: var(${surface});
            }
        `,
    )}

    &[data-size='small'] {
        font: var(--labels-small);
        height: var(--spacing-sizing-08);
    }

    &[data-size='x-small'] {
        font: var(--labels-x-small);
        height: var(--spacing-sizing-06);
    }

    &[data-color='white'] {
        box-shadow: var(--drop-shadow-south);
    }

    [data-triangle] {
        position: absolute;
        bottom: -12px;
        right: 0;
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 12px 12px 0 0;
        border-color: var(--foreground) transparent transparent transparent;
        transform: rotate(0deg);
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
