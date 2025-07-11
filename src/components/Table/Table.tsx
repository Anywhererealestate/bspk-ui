import './table.scss';
import { SvgAZAscend } from '@bspk/icons/AZAscend';
import { SvgAZDescend } from '@bspk/icons/AZDescend';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
    SortingState,
    getSortedRowModel,
} from '@tanstack/react-table';
import { ReactNode, useId, useMemo, useState } from 'react';
import { ElementProps } from '-/types/common';
import { cssWithVars } from '-/utils/cwv';
import { handleKeydown } from '-/utils/handleKeydown';

export type TableRow = Record<string, ReactNode>;

export type TableColumn<R extends TableRow = Record<string, ReactNode>> = {
    /**
     * The key of the column. This is used to access the data in the row.
     *
     * @type string
     */
    key: keyof R;
    /**
     * The label of the column. This is used to display the column header.
     *
     * @type string
     */
    label: string;
    /**
     * The width of the column. This is used to set the width of the column.
     *
     * Used to set the value of
     * [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)
     *
     * @default 1fr
     * @type string
     */
    width?: string;
};

export type TableProps<R extends TableRow> = {
    /** The data of the table. */
    rows: R[];
    /** The columns of the table. */
    columns: TableColumn<R>[];
    /** The title of the table. */
    title?: string;
};

/**
 * Component description coming soon.
 *
 * @name Table
 * @phase WorkInProgress
 */

function Table<R extends TableRow>({ rows, columns, title, ...props }: ElementProps<TableProps<R>, 'div'>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const tableId = useId();

    const columnDefs: ColumnDef<R>[] = useMemo(
        () =>
            columns.map((col) => ({
                accessorKey: col.key as string,
                header: col.label,
                cell: (info) => info.getValue(),
            })),
        [columns],
    );

    const table = useReactTable({
        data: rows,
        columns: columnDefs,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting },
        onSortingChange: setSorting,
    });

    return (
        <div
            {...props}
            aria-label={title || 'table'}
            data-bspk="table"
            id={tableId}
            role="presentation"
            style={props.style}
        >
            {title && (
                <div data-title id={`${tableId}-title`}>
                    {title}
                </div>
            )}
            <div
                {...props}
                aria-labelledby={title ? `${tableId}-title` : undefined}
                data-table
                role="table"
                style={cssWithVars({
                    '--template-columns': columns.map((c) => `minmax(0, ${c.width || '1fr'})`).join(' '),
                })}
            >
                {table.getHeaderGroups().map((headerGroup) =>
                    headerGroup.headers.map((header, index, arr) => {
                        const isSorted = header.column.getIsSorted();
                        const isFirst = index === 0;
                        const isLast = index === arr.length - 1;
                        const dataHeadValue = isFirst ? 'first' : isLast ? 'last' : '';

                        return (
                            <div
                                data-head={dataHeadValue}
                                key={header.id}
                                onClick={header.column.getToggleSortingHandler()}
                                onKeyDown={handleKeydown(['Space', 'Enter'], header.column.getToggleSortingHandler())}
                                role="columnheader"
                                tabIndex={0}
                            >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {isSorted && <>{isSorted === 'asc' ? <SvgAZAscend /> : <SvgAZDescend />}</>}
                            </div>
                        );
                    }),
                )}
                {table.getRowModel().rows.map((row, rowIndex, rowArr) =>
                    row.getVisibleCells().map((cell) => (
                        <div
                            data-cell={cell.column.id}
                            data-row-last={rowIndex === rowArr.length - 1 || undefined}
                            key={cell.id}
                            role="cell"
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                    )),
                )}
            </div>
        </div>
    );
}

Table.bspkName = 'Table';

export { Table };
