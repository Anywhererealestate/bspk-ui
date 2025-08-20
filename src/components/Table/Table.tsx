import './table.scss';
import { SvgAZAscend } from '@bspk/icons/AZAscend';
import { SvgAZDescend } from '@bspk/icons/AZDescend';
import { SvgSortByAlpha } from '@bspk/icons/SortByAlpha';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
    SortingState,
    getSortedRowModel,
    getPaginationRowModel,
    TableState,
} from '@tanstack/react-table';
import { ReactNode, useMemo, useState } from 'react';
import { TableFooter, TableRow } from './Footer';
import { useId } from '-/hooks/useId';
import { ElementProps } from '-/types/common';
import { cssWithVars } from '-/utils/cwv';

const SORT_DIRECTION_ICON = {
    ascending: <SvgAZAscend />,
    descending: <SvgAZDescend />,
    none: <SvgSortByAlpha />,
} as const;

const meta = <R extends TableRow = Record<string, ReactNode>>(columnDef: ColumnDef<R, unknown>) =>
    columnDef.meta as TableColumn<R>;

export type TableColumn<R extends TableRow = Record<string, ReactNode>, K = keyof R> = {
    /**
     * The key of the column. This is used to access the data in the row.
     *
     * @type string
     */
    key: K;
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
    /**
     * Whether the column is sortable.
     *
     * @default false
     */
    enableSorting?: boolean;
};

export type TableProps<R extends TableRow> = {
    /** The data of the table. */
    data: R[];
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
    /**
     * The number of rows per page.
     *
     * If the number of rows exceeds the page size, pagination controls will be displayed.
     *
     * @default 10
     */
    pageSize?: number;
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
    data = [],
    columns: columnsProp,
    title,
    size = 'medium',
    pageSize = 10,
    ...props
}: ElementProps<TableProps<R>, 'div'>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const tableId = useId();

    const hasPagination = data?.length > pageSize;

    const tableState = useMemo(() => {
        const nextState: Partial<TableState> = { sorting };
        if (hasPagination) nextState.pagination = { pageIndex, pageSize };
        return nextState;
    }, [sorting, hasPagination, pageIndex, pageSize]);

    const tableColumns = useMemo(
        () =>
            columnsProp.map(
                (col): ColumnDef<R> => ({
                    accessorKey: col.key,
                    header: col.label,
                    cell: (info) => info.getValue(),
                    meta: { ...col, align: col.align || 'left' },
                }),
            ),
        [columnsProp],
    );

    const tableProps = useMemo(
        () => ({
            data,
            columns: tableColumns,
            getPaginationRowModel: hasPagination ? getPaginationRowModel() : undefined,
            getCoreRowModel: getCoreRowModel(),
            getSortedRowModel: getSortedRowModel(),
            state: tableState,
            onSortingChange: setSorting,
        }),
        [data, tableColumns, tableState, hasPagination],
    );

    const table = useReactTable(tableProps);

    const columns = useMemo(
        () =>
            table
                .getHeaderGroups()
                .flatMap((headerGroup) => headerGroup.headers)
                .map((header) => ({
                    ...header,
                    meta: meta(header.column.columnDef),
                })),
        [table],
    );

    // const { currentPage, setCurrentPage } = usePaginationState(numPages);

    // const { rows, numPages } = useMemo(() => {
    //     const start = (currentPage - 1) * pageSize;
    //     const end = start + pageSize;
    //     return {
    //         rows: table.getRowModel().rows.slice(start, end),
    //         numPages: Math.ceil(table.getRowModel().rows.length / pageSize),
    //     };
    // }, [table, pageSize]);

    return (
        <div {...props} data-bspk="table" data-size={size || 'medium'} id={tableId} style={props.style}>
            <table
                {...props}
                aria-colcount={columns.length}
                aria-rowcount={table.getRowModel().rows.length}
                style={cssWithVars({
                    '--column-count': columns.length,
                    '--template-columns': columns.map((header) => `minmax(0, ${header.meta.width || '1fr'})`).join(' '),
                })}
            >
                {title && <caption>{title}</caption>}
                <thead>
                    <tr>
                        {columns.map((header) => {
                            const sort = header.column.getIsSorted();

                            let sortDirection: 'ascending' | 'descending' | 'none' | undefined;
                            if (header.meta.enableSorting) sortDirection = sort ? `${sort}ending` : 'none';

                            return (
                                <th
                                    aria-sort={sortDirection}
                                    data-align={header.meta.align}
                                    key={header.id}
                                    scope="col"
                                >
                                    {sortDirection ? (
                                        <button onClick={header.column.getToggleSortingHandler()} type="button">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            <span aria-hidden>{SORT_DIRECTION_ICON[sortDirection]}</span>
                                            {sortDirection !== 'none' && (
                                                <span data-sr-only>
                                                    <span aria-live="polite" role="status">
                                                        sorted {sortDirection}
                                                    </span>
                                                </span>
                                            )}
                                        </button>
                                    ) : (
                                        flexRender(header.column.columnDef.header, header.getContext())
                                    )}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
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
            {hasPagination && (
                <TableFooter pageIndex={pageIndex} pageSize={pageSize} setPageIndex={setPageIndex} table={table} />
            )}
        </div>
    );
}

Table.bspkName = 'Table';

export { Table };
