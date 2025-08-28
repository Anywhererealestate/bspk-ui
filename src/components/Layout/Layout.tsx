import { ElementType, ReactNode } from 'react';
import { CommonProps, ElementAttributes } from '-/types/common';

export type LayoutProps<As extends ElementType = 'div'> = ElementAttributes<
    As,
    CommonProps<'style'> & {
        /**
         * The content of the Layout.
         *
         * @required
         */
        children?: ReactNode;
        /**
         * Determines if the flex-direction should be displayed as a column.
         *
         * @default false
         */
        column?: boolean;
        /** The gap between the children. */
        gap?: '4' | '16';
        /**
         * The element type to render as.
         *
         * @default div
         * @type ElementType
         */
        as?: As;
        /**
         * The alignment style to apply to the Layout.
         *
         * @default flex-start
         */
        align?: 'center' | 'flex-end' | 'flex-start' | 'stretch';
        /**
         * The justification style to apply to the Layout.
         *
         * @default flex-start
         */
        justify?: 'center' | 'flex-end' | 'flex-start' | 'stretch';
    }
>;

/**
 * Utility component used within other components for layout purposes.
 *
 * @example
 *     import { Layout } from '@bspk/ui/Layout';
 *
 *     export function Example() {
 *         return <Layout>Low effort example</Layout>;
 *     }
 *
 * @name Layout
 * @phase Utility
 */
export function Layout<As extends ElementType = 'div'>({
    children,
    column,
    gap = '16',
    as,
    align = 'flex-start',
    justify = 'flex-start',
    elementAttributes,
    style,
}: LayoutProps) {
    const As: ElementType = as || 'div';

    const alignItems = align || 'flex-start';
    const justifyContent = justify || 'flex-start';

    return (
        <As
            {...elementAttributes}
            // data-bspk="layout" -- Utility components do not need a data-bspk attribute
            style={{
                ...style,
                display: 'flex',
                flexDirection: column ? 'column' : 'row',
                gap: gap ? `${gap}px` : 'px',
                alignItems,
                justifyContent,
            }}
        >
            {children}
        </As>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
