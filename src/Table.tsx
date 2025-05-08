import { css } from '@emotion/react';
import { ReactNode } from 'react';

import { ElementProps } from '.';

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
 */
function Table<R extends TableRow>({ rows, columns, ...props }: ElementProps<TableProps<R>, 'div'>) {
    return (
        <div
            {...props}
            css={style}
            data-table
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

export const style = css`
    width: 100%;
    border-collapse: separate;
    text-align: left;
    border-spacing: 2rem 0.125rem;
    display: grid;
    color: var(--foreground-neutral-on-surface);
    font: var(--labels-base);
    border-radius: var(--radius-medium);
    border: 1px solid var(--stroke-neutral-low);

    [data-cell] {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sizing-02);
        padding: var(--spacing-sizing-04);
        background-color: var(--surface-neutral-t1-base);
        border-bottom: var(--stroke-neutral-low) solid 1px;
        font: var(--labels-small);
        p {
            margin: 0;
            padding: 0;
            font: var(--body-small);
        }
    }

    [data-head] {
        display: flex;
        align-items: center;
        flex-direction: row;
        border-bottom: 1px solid var(--stroke-neutral-base);
        background: var(--surface-neutral-t2-lowest);
        height: var(--spacing-sizing-10);
        padding: 0 var(--spacing-sizing-03);
        font: var(--labels-base);

        &[data-head='first'] {
            border-top-left-radius: var(--radius-medium);
        }

        &[data-head='last'] {
            border-top-right-radius: var(--radius-medium);
        }
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
