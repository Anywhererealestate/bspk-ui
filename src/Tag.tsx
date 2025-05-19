import './tag.scss';
import { ElementType, ReactNode } from 'react';

import { ColorVariant } from './utils/colorVariants';

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
            data-bspk="tag"
            data-color={color}
            data-size={size}
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

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
