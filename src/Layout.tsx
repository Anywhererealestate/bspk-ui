import { ElementType, ReactNode } from 'react';

import { ElementProps } from './';

export type LayoutProps<As extends ElementType = 'div'> = {
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
     * Additional styles to apply to the Layout.
     *
     * @default flex-start
     */
    align?: 'center' | 'flex-end' | 'flex-start' | 'stretch';
    /**
     * Additional styles to apply to the Layout.
     *
     * @default flex-start
     */
    justify?: 'center' | 'flex-end' | 'flex-start' | 'stretch';
};

/**
 * Utility component used within other components for layout purposes.
 *
 * @name Layout
 */
function Layout<As extends ElementType = 'div'>({
    children,
    column,
    gap = '16',
    style,
    as,
    align = 'flex-start',
    justify = 'flex-start',
    ...props
}: ElementProps<LayoutProps<As>, As>) {
    const As: ElementType = as || 'div';

    const alignItems = align || 'flex-start';
    const justifyContent = justify || 'flex-start';

    return (
        <As
            {...props}
            data-bspk="layout"
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

Layout.bspkName = 'Layout';

export { Layout };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
