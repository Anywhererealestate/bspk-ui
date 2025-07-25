import { ReactNode } from 'react';
import { Truncated } from '-/components/Truncated';

import { ColorVariant } from '-/utils/colorVariants';

import './tag.scss';

export type TagProps = {
    /** The label of the tag. */
    label?: string;
    /** The content of the tag. */
    children?: ReactNode;
    /**
     * The size of the tag.
     *
     * @default small
     */
    size?: 'small' | 'x-small';
    /**
     * The color of the tag.
     *
     * @default grey
     */
    color?: ColorVariant;
    /**
     * The display variant of the tag.
     *
     * @default flat
     */
    variant?: 'corner-wrap' | 'flat' | 'pill';
};

/**
 * A non-interactive visual indicators to draw attention or categorization of a component.
 *
 * @example
 *     import { Tag } from '@bspk/ui/Tag';
 *
 *     export function Example() {
 *         return (
 *             <Tag variant="flat" color="primary">
 *                 Example Tag
 *             </Tag>
 *         );
 *     }
 *
 * @name Tag
 * @phase AccessibilityReview
 */
function Tag({ children, label, color = 'white', size = 'small', variant = 'flat' }: TagProps) {
    return (
        <div data-bspk="tag" data-color={color} data-size={size} data-variant={variant}>
            {label && <Truncated>{label}</Truncated>}
            {children}
            {variant === 'corner-wrap' && <div data-triangle />}
        </div>
    );
}

Tag.bspkName = 'Tag';

export { Tag };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
