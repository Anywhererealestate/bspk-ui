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
import { ReactNode, useMemo, useState } from 'react';
import { useId } from '-/hooks/useId';
import { ElementProps } from '-/types/common';
import { cssWithVars } from '-/utils/cwv';
import { handleKeyDown } from '-/utils/handleKeyDown';

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
 * A container for displaying tabular data.
 *
 * The table supports sorting and custom column definitions.
 *
 * @example
 *     import { Table } from '@bspk/ui/Table';
 *
 *     function Example() {
 *         return (
 *             <Table
 *                 columns={[
 *                     { key: 'state', label: 'State', width: '100px' },
 *                     { key: 'capital', label: 'Capital', width: '1fr' },
 *                 ]}
 *                 rows={[
 *                     { state: 'New Jersey', capital: 'Trenton' },
 *                     { state: 'New York', capital: 'Albany' },
 *                     { state: 'California', capital: 'Sacramento' },
 *                 ]}
 *                 title="State Capitals"
 *             />
 *         );
 *     }
 *
 * @name Table
 * @phase UXReview
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
        <div {...props} data-bspk="table" id={tableId} style={props.style}>
            {title && (
                <div data-title id={`${tableId}-title`}>
                    {title}
                </div>
            )}
            <table
                aria-labelledby={title ? `${tableId}-title` : undefined}
                style={cssWithVars({
                    '--template-columns': columns.length,
                    gridTemplateColumns: columns.map((col) => col.width || '1fr').join(' '),
                    ...props.style,
                })}
            >
                <thead>
                    <tr>
                        {table.getHeaderGroups().map((headerGroup) =>
                            headerGroup.headers.map((header, index) => {
                                const isSorted = header.column.getIsSorted();
                                return (
                                    <th
                                        aria-sort={
                                            isSorted ? (isSorted === 'asc' ? 'ascending' : 'descending') : 'none'
                                        }
                                        data-th-index={index}
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        onKeyDown={handleKeyDown({
                                            Space: () => header.column.getToggleSortingHandler(),
                                            Enter: () => header.column.getToggleSortingHandler(),
                                        })}
                                        role="columnheader"
                                        scope="col"
                                        tabIndex={0}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {isSorted && <>{isSorted === 'asc' ? <SvgAZAscend /> : <SvgAZDescend />}</>}
                                    </th>
                                );
                            }),
                        )}
                    </tr>
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, rowIndex) => (
                        <tr data-cell-row={rowIndex % 2 === 0 ? 'odd' : 'even'} data-row-index={rowIndex} key={row.id}>
                            {row.getVisibleCells().map((cell, cellIndex) => (
                                <td data-cell-index={cellIndex} key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Table.bspkName = 'Table';

export { Table };
