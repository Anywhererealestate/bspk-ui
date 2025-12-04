import { ElementType, ReactNode } from 'react';
import { ElementProps } from '-/types/common';
import { SizingPixels, numToSizingVar } from '-/utils/sizing';

export type LayoutProps<As extends ElementType = ElementType> = {
    /**
     * The content of the Layout.
     *
     * @required
     */
    children?: ReactNode;
    /** The gap between the children. */
    gap?: SizingPixels;
    /**
     * The element type to render as.
     *
     * @default div
     * @type ElementType
     */
    as?: As;
    /**
     * The align-items style to apply to the Layout.
     *
     * @default flex-start
     */
    align?: 'center' | 'end' | 'flex-end' | 'flex-start' | 'start' | 'stretch';
    /**
     * The justification style to apply to the Layout.
     *
     * @default flex-start
     */
    justify?: 'center' | 'flex-end' | 'flex-start' | 'stretch';
    /** The flex-wrap style to apply to the Layout. */
    wrap?: 'nowrap' | 'wrap-reverse' | 'wrap';
    /** The flex-direction style to apply to the Layout. */
    direction?: 'column-reverse' | 'column' | 'row-reverse' | 'row';
};

/**
 * Utility component used within other components for layout purposes.
 *
 * @example
 *     import { Layout } from '@bspk/ui/Layout';
 *
 *     <Layout>Low effort example</Layout>;
 *
 * @name Layout
 * @phase Utility
 */
export function Layout<As extends ElementType = ElementType>({
    children,
    gap,
    style,
    as,
    align = 'flex-start',
    justify = 'flex-start',
    wrap,
    direction = 'row',
    ...props
}: ElementProps<LayoutProps<As>, As>) {
    const As: ElementType = as || 'div';

    const alignItems = align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align;

    return (
        <As
            {...props}
            // data-bspk="layout" -- Utility components do not need a data-bspk attribute
            style={{
                ...style,
                display: 'flex',
                flexDirection: direction,
                gap: numToSizingVar(gap),
                alignItems,
                justifyContent: justify || 'flex-start',
                flexWrap: wrap ? 'wrap' : 'nowrap',
            }}
        >
            {children}
        </As>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
