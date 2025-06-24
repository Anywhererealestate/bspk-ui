import './skeleton.scss';
import { CSSProperties, ReactNode } from 'react';

import { TxtVariant } from './utils/txtVariants';

export type SkeletonTextProps = {
    /**
     * The variant of the text being loaded.
     *
     * @default body-base
     */
    variant?: TxtVariant;
    /**
     * The number of lines showing.
     *
     * @default 3
     * @minimum 1
     */
    lines?: number;
    /**
     * The content of the skeleton.
     *
     * When the value is undefined, null or false the skeleton will appear.
     *
     * If the value is provided, the skeleton will not appear and the content will be displayed instead.
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
 * You can use this component directly or use the specific use case components: SkeletonTextPhoto, SkeletonTextProfile,
 * SkeletonTextRectangular, SkeletonTextText, SkeletonTextThumbnail, SkeletonTextCircular.
 *
 * @example
 *     import { SkeletonText } from '@bspk/ui/skeleton';
 *
 *     function Example(item: { content: string } | null) {
 *         return (
 *             <SkeletonText textLines={1} textVariant="body-base">
 *                 <Txt as="p" variant="body-base">
 *                     {item?.content}
 *                 </Txt>
 *             </SkeletonText>
 *         );
 *     }
 *
 * @exampleDescription This example shows a skeleton loading state for some text but can be used for any element.
 *
 * @name SkeletonText
 * @phase DesignReview
 */
function SkeletonText({ lines = 3, variant, children = null }: SkeletonTextProps) {
    return children !== null && children !== undefined && children !== false ? (
        children
    ) : (
        <div
            aria-busy="true"
            aria-label="Loading"
            data-bspk="skeleton"
            data-variant="text"
            role="status"
            style={
                {
                    '--text-height': `var(--${variant}-size)`,
                    '--text-margin': `calc(var(--${variant}-line-height) - var(--${variant}-size))`,
                } as CSSProperties
            }
        >
            {[...Array(Math.max(1, lines || 0))].map((_, index) => (
                <div data-line key={index} />
            ))}
        </div>
    );
}

SkeletonText.bspkName = 'SkeletonText';

export { SkeletonText };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
