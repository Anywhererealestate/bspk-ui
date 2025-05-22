import './skeleton.scss';
import { CSSProperties } from 'react';

import { TxtVariant } from './utils/txtVariants';

export type SkeletonProps = {
    /**
     * The text variant of the skeleton.
     *
     * @default text
     */
    variant?: 'circular' | 'photo' | 'profile' | 'rectangular' | 'text' | 'thumbnail';
    /**
     * The size of the text. This is only used when variant is 'text'.
     *
     * @default body-base
     */
    textVariant?: TxtVariant;
    /**
     * The number of lines showing. This is only used when variant is 'text'.
     *
     * @default 3
     */
    textLines?: number;
    /**
     * The width of the skeleton. This is ignored when variant is 'text', 'profile', or 'thumbnail'.
     *
     * @default 200
     */
    width?: number | string;
    /**
     * The height of the skeleton. This is ignored when variant is 'text', 'profile', or 'thumbnail'.
     *
     * @default 100
     */
    height?: number | string;
};

/**
 * A visual placeholder for an element while it is in a loading state.
 *
 * @name Skeleton
 */
function Skeleton({
    width = 100,
    height = 100,
    textLines,
    textVariant: textSize,
    variant = 'rectangular',
}: SkeletonProps) {
    return (
        <div
            data-bspk="skeleton"
            data-variant={variant}
            style={
                {
                    '--height': typeof height === 'number' ? `${height}px` : height,
                    '--text-height': `var(--${textSize}-size)`,
                    '--text-margin': `calc(var(--${textSize}-line-height) - var(--${textSize}-size))`,
                    '--width': typeof width === 'number' ? `${width}px` : width,
                } as CSSProperties
            }
        >
            {variant === 'text' &&
                [...Array(Math.max(1, textLines || 0))].map((_, index) => <div data-line key={index} />)}
        </div>
    );
}

Skeleton.bspkName = 'Skeleton';

export { Skeleton };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
