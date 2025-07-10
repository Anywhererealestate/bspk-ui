import './table.scss';
import { SvgIcon } from '@bspk/icons/SvgIcon';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
    SortingState,
    getSortedRowModel,
} from '@tanstack/react-table';
import { ReactNode, useState } from 'react';

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

function Table<R extends TableRow>({
    rows,
    columns,
    title,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & TableProps<R>) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const columnDefs: ColumnDef<R>[] = columns.map((col) => ({
        accessorKey: col.key as string,
        header: col.label,
        cell: (info) => info.getValue(),
    }));

    const table = useReactTable({
        data: rows,
        columns: columnDefs,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
        onSortingChange: setSorting,
    });

    return (
        <div {...props} aria-label={title || 'table'} data-bspk="table" style={props.style}>
            {title && <div data-bspk="table-title">{title}</div>}

            <div
                {...props}
                role="presentation"
                style={{
                    display: 'grid',
                    gridTemplateColumns: columns.map((c) => `minmax(0, ${c.width || '1fr'})`).join(' '),
                }}
            >
                {table.getHeaderGroups().map((headerGroup) =>
                    headerGroup.headers.map((header, index, arr) => {
                        const isSorted = header.column.getIsSorted();

                        const isFirst = index === 0;
                        const isLast = index === arr.length - 1;

                        const dataHeadValue = isFirst ? 'first' : isLast ? 'last' : '';

                        return (
                            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                            <div
                                data-head={dataHeadValue}
                                key={header.id}
                                onClick={header.column.getToggleSortingHandler()}
                            >
                                {flexRender(header.column.columnDef.header, header.getContext())}{' '}
                                {isSorted && (
                                    <SvgIcon name={isSorted === 'asc' ? 'AZAscend' : 'AZDescend'} width={20} />
                                )}
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
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}{' '}
                        </div>
                    )),
                )}{' '}
            </div>
        </div>
    );
}

Table.bspkName = 'Table';

export { Table };
