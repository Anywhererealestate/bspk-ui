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

const meta = <R extends TableRow = Record<string, ReactNode>>(columnDef: ColumnDef<R, unknown>) =>
    columnDef.meta as TableColumn<R>;

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
    /**
     * The alignment of the column. This is used to set the text alignment of the column.
     *
     * @default left
     */
    align?: 'center' | 'left' | 'right';
};

export type TableProps<R extends TableRow> = {
    /** The data of the table. */
    rows: R[];
    /** The columns of the table. */
    columns: TableColumn<R>[];
    /** The title of the table. */
    title?: string;
    /**
     * The size of the table.
     *
     * @default medium
     */
    size?: 'large' | 'medium' | 'small' | 'x-large';
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
function Table<R extends TableRow>({
    rows,
    columns: columnsProp,
    title,
    size = 'medium',
    ...props
}: ElementProps<TableProps<R>, 'div'>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const tableId = useId();

    const table = useReactTable({
        data: rows,
        columns: columnsProp.map(
            (col): ColumnDef<R> => ({
                accessorKey: col.key as string,
                header: col.label,
                cell: (info) => info.getValue(),
                meta: { ...col, align: col.align || 'left' },
            }),
        ),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting },
        onSortingChange: setSorting,
    });

    const headers = useMemo(
        () =>
            table
                .getHeaderGroups()
                .flatMap((headerGroup) => headerGroup.headers)
                .map((header) => ({
                    ...header,
                    meta: meta(header.column.columnDef),
                    isSorted: header.column.getIsSorted(),
                })),
        [table],
    );

    return (
        <div {...props} data-bspk="table" data-size={size || 'medium'} id={tableId} style={props.style}>
            <table
                {...props}
                aria-colcount={headers.length}
                aria-rowcount={table.getRowModel().rows.length}
                style={cssWithVars({
                    '--column-count': headers.length,
                    '--template-columns': headers.map((header) => `minmax(0, ${header.meta.width || '1fr'})`).join(' '),
                })}
            >
                {title && <caption>{title}</caption>}
                <thead>
                    <tr>
                        {headers.map((header) => {
                            return (
                                <th
                                    aria-sort={
                                        header.isSorted
                                            ? header.isSorted === 'asc'
                                                ? 'ascending'
                                                : 'descending'
                                            : 'none'
                                    }
                                    data-align={header.meta.align}
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
                                    {header.isSorted && (
                                        <>{header.isSorted === 'asc' ? <SvgAZAscend /> : <SvgAZDescend />}</>
                                    )}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} role="row">
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    data-align={meta(cell.column.columnDef).align || 'left'}
                                    data-cell={cell.id}
                                    data-cell-column={cell.column.id}
                                    key={cell.id}
                                >
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
