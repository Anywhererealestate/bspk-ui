import { css } from '@emotion/react';
import { CSSProperties } from 'react';

import { TxtVariant } from './utils/txtVariants';

export type SkeletonVariant = TxtVariant | 'other';

export type SkeletonProps = {
    /**
     * The text variant of the skeleton. If 'other' skeleton will expand to size of nearest relative positioned parent.
     *
     * @default other
     */
    variant?: SkeletonVariant;
    /**
     * The number of lines showing. Ignored when variant is other.
     *
     * @default 1
     */
    lines?: number;
};

/**
 * A visual placeholder for an element while it is in a loading state.
 *
 * @name Skeleton
 */
function Skeleton({ variant = 'other', lines: linesProp = 3 }: SkeletonProps) {
    const lines = Math.max(1, linesProp || 0);

    return (
        <div
            css={style}
            data-skeleton
            style={
                {
                    '--margin': `calc(var(--${variant}-line-height) - var(--${variant}-size))`,
                    '--height': `var(--${variant}-size)`,
                } as CSSProperties
            }
        >
            {variant !== 'other' && [...Array(lines)].map((_, index) => <div data-line key={index} />)}
        </div>
    );
}

Skeleton.bspkName = 'Skeleton';

export { Skeleton };

export const style = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--margin);

    animation: skeleton-pulse 1.5s infinite;
    @keyframes skeleton-pulse {
        0% {
            opacity: 0.8;
        }
        50% {
            opacity: 0.4;
        }
        100% {
            opacity: 0.8;
        }
    }

    &:empty {
        width: auto;
        height: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--foreground-neutral-skeleton-element);
        border-radius: var(--radius-small);
    }

    [data-line] {
        width: 100%;
        background: var(--foreground-neutral-skeleton-element);
        border-radius: var(--radius-small);
        height: var(--height);
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
