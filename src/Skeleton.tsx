/* eslint-disable react/no-multi-comp */
import './skeleton.scss';
import { CSSProperties, ReactNode } from 'react';

import { TxtVariant } from './utils/txtVariants';

export type SkeletonProps = {
    /**
     * The variant of the skeleton that best hints the content being loaded.
     *
     * @default text
     */
    variant?: 'circular' | 'photo' | 'profile' | 'rectangular' | 'text' | 'thumbnail';
    /**
     * The variant of the text being loaded. This is only used when variant is 'text'.
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
    /**
     * The content of the skeleton.
     *
     * When the value is undefined, null or false the skeleton will appear.
     *
     * If the value is provided, the skeleton will not appear and the content will be displayed instead.
     *
     * @default null
     */
    children?: ReactNode | null;
};

/**
 * A visual placeholder for an element while it is in a loading state.
 *
 * The data for your components might not be immediately available. You can improve the perceived responsiveness of the
 * page by using skeletons. It feels like things are happening immediately, then the information is incrementally
 * displayed on the screen.
 *
 * This component can be used to create skeletons for various types of content, such as text, images, or profiles.
 *
 * You can use this component directly or use the specific use case components: SkeletonPhoto, SkeletonProfile,
 * SkeletonRectangular, SkeletonText, SkeletonThumbnail, SkeletonCircular.
 *
 * @example
 *     import { Skeleton } from '@bspk/ui/skeleton';
 *
 *     function Example(item: { title: string; src: string } | null) {
 *         return item ? (
 *             <img
 *                 style={{
 *                     width: 210,
 *                     height: 118,
 *                 }}
 *                 alt={item.title}
 *                 src={item.src}
 *             />
 *         ) : (
 *             <Skeleton variant="photo" width={210} height={118} />
 *         );
 *     }
 *
 * @exampleDescription This example shows a skeleton loading state for an image but can be used for any element.
 *
 * @name Skeleton
 */
function Skeleton({
    width = 100,
    height = 100,
    textLines = 3,
    textVariant: textSize,
    variant = 'text',
    children = null,
}: SkeletonProps) {
    return children !== null && children !== undefined && children !== false ? (
        children
    ) : (
        <div
            aria-busy="true"
            aria-label="Loading"
            data-bspk="skeleton"
            data-variant={variant}
            role="status"
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

function SkeletonCircular(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="circular" />;
}
function SkeletonPhoto(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="photo" />;
}
function SkeletonProfile(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="profile" />;
}
function SkeletonRectangular(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="rectangular" />;
}
function SkeletonText(props: Pick<SkeletonProps, 'textLines' | 'textVariant'>) {
    return <Skeleton {...props} variant="text" />;
}
function SkeletonThumbnail(props: Pick<SkeletonProps, 'height' | 'width'>) {
    return <Skeleton {...props} variant="thumbnail" />;
}

export {
    Skeleton,
    SkeletonCircular,
    SkeletonPhoto,
    SkeletonProfile,
    SkeletonRectangular,
    SkeletonText,
    SkeletonThumbnail,
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
