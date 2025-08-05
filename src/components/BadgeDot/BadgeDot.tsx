import { ReactNode } from 'react';
import { cssWithVars } from '-/utils/cwv';

import './badge-dot.scss';

type BadgeDotSize = 6 | 8 | 10 | 12;

const OUTLINE_WIDTHS: Record<BadgeDotSize, number> = {
    6: 1,
    8: 2,
    10: 2,
    12: 2,
};

export type BadgeDotProps = {
    /**
     * The color variant of the badge-dot.
     *
     * @default primary
     */
    color?: 'primary' | 'secondary';
    /**
     * The context for which the badge-dot is applied.
     *
     * Could be a button, link, or any other element that the badge-dot is associated with.
     */
    children?: ReactNode;
    /**
     * The size of the badge-dot.
     *
     * @default 6
     */
    size?: BadgeDotSize;
    /**
     * Whether the badge-dot should have an outline.
     *
     * @default false
     */
    outline?: boolean;
};

/**
 * A non-numeric badge used to indicate something new or its current status.
 *
 * @example
 *     import { BadgeDot } from '@bspk/ui/BadgeDot';
 *
 *     function Example() {
 *         return <BadgeDot color="primary" />;
 *     }
 *
 * @exampleDescription This example shows a badge-dot with a count of 5, size small, and primary variant.
 *
 * @name BadgeDot
 * @phase UXReview
 */
function BadgeDot({ children, color = 'primary', size = 6, outline = false }: BadgeDotProps) {
    const badgeDot = (
        <sup
            data-attachment={!!children || undefined}
            data-bspk="badge-dot"
            data-color={color}
            data-outline={outline || undefined}
            style={cssWithVars({
                '--size': `${size}px`,
                '--outline-width': `${OUTLINE_WIDTHS[size]}px`,
            })}
        />
    );

    if (children) {
        return (
            <span data-attachment-wrapper>
                {children}
                {badgeDot}
            </span>
        );
    }

    return badgeDot;
}

BadgeDot.bspkName = 'BadgeDot';

export { BadgeDot };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
