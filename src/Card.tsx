import { css } from '@emotion/react';
import { ReactNode } from 'react';

export type CardProps = {
    /**
     * The content of the card.
     *
     * @required
     */
    children: ReactNode;
    /**
     * Determines if the padding should be hidden.
     *
     * @default true
     */
    showPadding?: boolean;
    /**
     * Determines how the card border will appear.
     *
     * @default elevated
     */
    variant?: 'elevated' | 'filled' | 'outlined';
};

/**
 * Cards are often rectangular and contain various content, such as text, images, icons, multimedia, and interactive
 * elements.
 *
 * They are similar in size and shape to playing cards and are intended to encourage users to click or tap to view more
 * details.
 *
 * @name Card
 */
function Card({ children, showPadding, variant = 'elevated' }: CardProps) {
    return (
        <div css={style} data-card data-hide-padding={showPadding === false || undefined} data-variant={variant}>
            {children}
        </div>
    );
}

Card.bspkName = 'Card';

export { Card };

export const style = css`
    display: block;
    background: var(--surface-neutral-t1-base);
    padding: var(--spacing-sizing-03);
    border-radius: var(--radius-medium);
    overflow: hidden;

    &[data-hide-padding] {
        padding: 0;
    }
    &[data-variant='outlined'] {
        border: solid 1px var(--stroke-neutral-low);
    }
    &[data-variant='elevated'] {
        box-shadow:
            0 1px 2px 0 var(--shadow-32),
            0 1px 3px 1px var(--shadow-15);
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
