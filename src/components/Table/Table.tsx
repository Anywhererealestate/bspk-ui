import { ReactNode } from 'react';

import { ElementProps } from '-/types/common';

import './table.scss';

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
};

/**
 * Component description coming soon.
 *
 * @name Table
 * @phase Backlog
 */
function Table<R extends TableRow>({ rows, columns, ...props }: ElementProps<TableProps<R>, 'div'>) {
    return (
        <div
            {...props}
            data-bspk="table"
            style={{
                ...props.style,
                gridTemplateColumns: columns.map((c) => `minmax(0, ${c.width || '1fr'})`).join(' '),
            }}
        >
            {columns.map((column, index, arr) => (
                <div
                    data-head={[index === 0 && 'first', index === arr.length - 1 && 'last'].filter(Boolean).join(' ')}
                    key={column.key as string}
                >
                    {column.label}
                </div>
            ))}
            {rows.map((row, index, arr) => {
                const lastRow = index === arr.length - 1 || undefined;
                return columns.map((column) => (
                    <div data-cell={column.key} data-row-last={lastRow} key={index + (column.key as string)}>
                        {row[column.key]}
                    </div>
                ));
            })}
        </div>
    );
}

Table.bspkName = 'Table';

export { Table };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
