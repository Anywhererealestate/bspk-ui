import { Table } from '@tanstack/react-table';
import { ReactNode } from 'react';
import { Pagination } from '-/components/Pagination';

export type TableRow = Record<string, ReactNode>;

export function TableFooter<R extends TableRow = Record<string, ReactNode>>({
    table,
    pageIndex,
    pageSize,
    setPageIndex,
}: {
    pageIndex: number;
    table: Table<R>;
    pageSize: number;
    setPageIndex: (newVal: number) => void;
}) {
    const paginationRowModel = table.getPaginationRowModel();
    const totalRows = table.getFilteredRowModel().rows.length;
    const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
    const endRow = startRow + paginationRowModel.rows.length - 1;

    return (
        <div data-pagination>
            <div data-pagination-label>
                Showing {startRow}-{endRow} of {totalRows} results
            </div>

            <Pagination
                numPages={table.getPageCount()}
                onChange={(newVal) => setPageIndex(newVal - 1)}
                value={pageIndex + 1}
            />
        </div>
    );
}
