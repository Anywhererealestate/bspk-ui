import './table.scss';
import { SvgAZAscend } from '@bspk/icons/AZAscend';
import { SvgAZDescend } from '@bspk/icons/AZDescend';
import { AriaAttributes, useEffect, useState } from 'react';
import { TableFooter } from './Footer';
import { formatCell, SortOrder, TableColumn, TableRow, TableSize, useTable } from './utils';
import { useId } from '-/hooks/useId';
import { ElementProps } from '-/types/common';
import { cssWithVars } from '-/utils/cwv';

const SORT_META: Record<
    SortOrder | 'none',
    {
        icon: JSX.Element | null;
        label: string;
        aria: AriaAttributes['aria-sort'];
    }
> = {
    asc: {
        icon: <SvgAZAscend />,
        label: 'sorted ascending',
        aria: 'ascending',
    },
    desc: {
        icon: <SvgAZDescend />,
        label: 'sorted descending',
        aria: 'descending',
    },
    none: {
        icon: null,
        label: 'not sorted',
        aria: 'none',
    },
} as const;

export type TableProps<R extends TableRow> = {
    /**
     * The data of the table.
     *
     * Array<TableRow>
     */
    data: R[];
    /**
     * The column definitions of the table.
     *
     * @type Array<TableColumn>
     */
    columns: (TableColumn<R> | boolean)[];
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
 *                 data={[
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
export function Table<R extends TableRow>({
    data = [],
    columns: columnsProp,
    title,
    size = 'medium',
    pageSize = 10,
    ...props
}: ElementProps<TableProps<R>, 'div'>) {
    const tableId = useId();
    const [pageIndex, setPageIndex] = useState(0);
    // when the length of data changes we should reset the
    useEffect(() => setPageIndex(0), [data.length]);

    const columns = columnsProp.filter((column): column is TableColumn<R> => {
        return typeof column === 'object' && column !== null;
    });
    const hasPagination = data?.length > pageSize;

    const { rows, sorting, toggleSorting, totalColumns, totalPages } = useTable<R>({
        data,
        pageIndex,
        pageSize,
        columns,
    });

    return (
        <div
            {...props}
            data-bspk="table"
            data-has-pagination={hasPagination || undefined}
            data-size={size || 'medium'}
            id={tableId}
            style={props.style}
        >
            <div data-scroll-container>
                <table
                    {...props}
                    aria-colcount={totalColumns}
                    aria-rowcount={data.length}
                    style={cssWithVars({
                        '--template-columns': columns
                            // Create a template column for each column definition
                            ?.map((column) => `minmax(min-content, ${column.width || '1fr'})`)
                            .join(' '),
                    })}
                >
                    {title && <caption>{title}</caption>}
                    <thead>
                        <tr>
                            {columns?.map((column) => {
                                const sortMeta =
                                    column.sort &&
                                    SORT_META[sorting.find((s) => s.key === column.key)?.order || 'none'];

                                return (
                                    <th
                                        aria-sort={sortMeta?.aria}
                                        data-align={column.align}
                                        data-sortable={!!sortMeta || undefined}
                                        key={column.key}
                                        scope="col"
                                    >
                                        {sortMeta ? (
                                            <button onClick={() => toggleSorting(column.key)} type="button">
                                                {column.label}
                                                {sortMeta?.icon && (
                                                    <span aria-hidden data-sort-icon>
                                                        {sortMeta?.icon}
                                                    </span>
                                                )}
                                                <span data-sr-only>
                                                    <span aria-live="polite" role="status">
                                                        {sortMeta.label}
                                                    </span>
                                                </span>
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
                                        data-valign={column.valign || 'center'}
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
                        totalPages={totalPages}
                        totalRows={data.length}
                    />
                )}
            </div>
        </div>
    );
}

