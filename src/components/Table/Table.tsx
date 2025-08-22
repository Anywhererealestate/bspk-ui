import './table.scss';
import { SvgAZAscend } from '@bspk/icons/AZAscend';
import { SvgAZDescend } from '@bspk/icons/AZDescend';
import { useState } from 'react';
import { TableFooter } from './Footer';
import { formatCell, TableColumn, TableRow, TableSize, useTable } from './utils';
import { useId } from '-/hooks/useId';
import { ElementProps } from '-/types/common';
import { cssWithVars } from '-/utils/cwv';

const SORT_DIRECTION_ICON = {
    ascending: <SvgAZAscend />,
    descending: <SvgAZDescend />,
} as const;

export type TableProps<R extends TableRow> = {
    /** The data of the table. */
    data: R[];
    /** The column definitions of the table. */
    columns: TableColumn<R>[];
    /** The title of the table. */
    title?: string;
    /**
     * The size of the table.
     *
     * @default medium
     */
    size?: TableSize;
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
    columns,
    title,
    size = 'medium',
    pageSize = 10,
    ...props
}: ElementProps<TableProps<R>, 'div'>) {
    const [pageIndex, setPageIndex] = useState(0);
    const tableId = useId();

    const hasPagination = data?.length > pageSize;

    const { rows, sorting, toggleSorting, totalColumns, totalColumnsDisplayed } = useTable<R>({
        data,
        pageIndex,
        pageSize,
    });

    return (
        <div {...props} data-bspk="table" data-size={size || 'medium'} id={tableId} style={props.style}>
            <table
                {...props}
                aria-colcount={totalColumns}
                aria-rowcount={data.length}
                style={cssWithVars({
                    '--column-count': totalColumnsDisplayed,
                    '--template-columns': columns?.map((column) => `minmax(0, ${column.width || '1fr'})`).join(' '),
                })}
            >
                {title && <caption>{title}</caption>}
                <thead>
                    <tr>
                        {columns?.map((column) => {
                            const sort = sorting.find((s) => s.key === column.key)?.order;
                            const sortable = !!column.sort;

                            let sortDirection: 'ascending' | 'descending' | undefined;
                            if (sortable) sortDirection = sort && `${sort}ending`;

                            return (
                                <th
                                    aria-sort={sortDirection}
                                    data-align={column.align}
                                    data-sortable={sortable || undefined}
                                    key={column.key}
                                    scope="col"
                                >
                                    {sortable ? (
                                        <button onClick={() => toggleSorting(column.key)} type="button">
                                            {column.label}
                                            {sortDirection && (
                                                <>
                                                    <span aria-hidden>{SORT_DIRECTION_ICON[sortDirection]}</span>
                                                    <span data-sr-only>
                                                        <span aria-live="polite" role="status">
                                                            sorted {sortDirection}
                                                        </span>
                                                    </span>
                                                </>
                                            )}
                                        </button>
                                    ) : (
                                        column.label
                                    )}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            {columns?.map((column) => (
                                <td
                                    data-align={column.align || 'left'}
                                    data-cell={column.key}
                                    key={`${row.id}-${column.key}`}
                                >
                                    {formatCell(column.formatter?.(row, size) || row[column.key])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {hasPagination && (
                <TableFooter
                    id={tableId}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    setPageIndex={setPageIndex}
                    totalRows={data.length}
                />
            )}
        </div>
    );
}

Table.bspkName = 'Table';

export { Table };
