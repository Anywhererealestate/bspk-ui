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
    key: keyof R;
    label: string;
    width?: string;
};

export type TableProps<R extends TableRow> = {
    rows: R[];
    columns: TableColumn<R>[];
};

function Table<R extends TableRow>({ rows, columns, ...props }: React.HTMLAttributes<HTMLDivElement> & TableProps<R>) {
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
        <div
            {...props}
            data-bspk="table"
            style={{
                ...props.style,
                display: 'grid',
                gridTemplateColumns: columns.map((c) => `minmax(0, ${c.width || '1fr'})`).join(' '),
            }}
        >
            {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header, index, arr) => {
                    const isSorted = header.column.getIsSorted();

                    return (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                        <div
                            data-head={[index === 0 && 'first', index === arr.length - 1 && 'last']
                                .filter(Boolean)
                                .join(' ')}
                            key={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                        >
                            {flexRender(header.column.columnDef.header, header.getContext())}{' '}
                            {isSorted && <SvgIcon name={isSorted === 'asc' ? 'AZAscend' : 'AZDescend'} width={20} />}
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
    );
}

Table.bspkName = 'Table';

export { Table };
