import { ReactNode } from 'react';
import { SizingPixels, numToSizingVar } from '-/utils/sizing';

export type GridProps = {
    /**
     * The content of the grid.
     *
     * @required
     */
    children: ReactNode;
    /**
     * The number of columns in the grid or an array of column widths in fractions.
     *
     * @default 1
     */
    columns?: number[] | number;
    /** The gap between the children. */
    gap?: SizingPixels;
    /** Additional styles for the grid container. */
    style?: React.CSSProperties;
    /**
     * The minimum width of each column.
     *
     * @default auto
     */
    minColumnWidth?: string;
};

/**
 * A utility component that arranges its children in a grid layout.
 *
 * @example
 *     import { Grid } from '@bspk/ui/Grid';
 *
 *     <Grid columns={4} gap="8">
 *         <ExamplePlaceholder label="Cell 1" />
 *         <ExamplePlaceholder label="Cell 2" />
 *         <ExamplePlaceholder label="Cell 3" />
 *         <ExamplePlaceholder label="Cell 4" />
 *     </Grid>;
 *
 * @name Grid
 * @phase Utility
 */
export function Grid({ columns = 1, children, gap, style, minColumnWidth = 'auto' }: GridProps) {
    let gridTemplateColumns = `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`;

    // If columns is an array, map it to a string of fractions
    if (Array.isArray(columns)) gridTemplateColumns = columns?.map((width) => `${width}fr`).join(' ') || 'auto';
    // If columns is not an array, use the default repeat pattern
    else gridTemplateColumns = `repeat(${columns}, minmax(${minColumnWidth}, 1fr))`;

    return (
        <div
            data-bspk-utility="grid"
            style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns,
                gap: numToSizingVar(gap),
                ...style,
            }}
        >
            {children}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
