import './pagination.scss';
import { SvgIcon } from '@bspk/icons/SvgIcon';
import { AriaAttributes } from 'react';
import { PageInput } from './PageInput';
import { PageList } from './PageList';
import { Button } from '-/components/Button';

// After this point the manual input renders. With equal or fewer pages the individual page buttons render instead.
const INPUT_TYPE_THRESHOLD = 7;

export type PaginationProps = {
    /**
     * The number of pages to display in the pagination component.
     *
     * @default 1
     */
    numPages: number;
    /**
     * The current page number.
     *
     * @default 1
     */
    value: number;

    /** Called when the page changes. */
    onChange: (newPageNumber: number) => void;
};

/**
 * A navigation component that allows customers to move between a range of listed content within a page into smaller
 * multiple micro pages.
 *
 * @example
 *     import { Pagination } from '@bspk/ui/Pagination';
 *     import { usePaginationState } from '@bspk/ui/hooks/usePaginationState';
 *
 *     function Example() {
 *         const numPages = 10;
 *
 *         const { currentPage, setCurrentPage } = usePaginationState(numPages);
 *
 *         return <Pagination value={currentPage} onChange={setCurrentPage} numPages={numPages} />;
 *     }
 *
 * @name Pagination
 * @phase UXReview
 */
export function Pagination({ numPages, value, onChange, ...ariaProps }: AriaAttributes & PaginationProps) {
    const nextPage = () => {
        if (value < numPages) {
            onChange(value + 1);
        }
    };

    const previousPage = () => {
        if (value > 1) {
            onChange(value - 1);
        }
    };

    const isFirstPage = value === 1;
    const isLastPage = value === numPages;
    const isOutOfBoundsValue = value < 1 || value > numPages;
    const isOneOrFewerPages = numPages <= 1;

    return (
        <span data-bspk="pagination" role="group" {...ariaProps}>
            <Button
                disabled={isOutOfBoundsValue || isOneOrFewerPages || isFirstPage}
                icon={<SvgIcon name="ChevronLeft" />}
                iconOnly
                label={isFirstPage ? 'First page' : `Previous page (${value - 1})`}
                onClick={previousPage}
                owner="pagination"
                size="small"
                variant="tertiary"
            />

            {numPages > INPUT_TYPE_THRESHOLD ? (
                <PageInput numPages={numPages} onChange={onChange} value={value} />
            ) : (
                <PageList numPages={numPages} onChange={onChange} value={value} />
            )}

            <Button
                disabled={isOutOfBoundsValue || isOneOrFewerPages || isLastPage}
                icon={<SvgIcon name="ChevronRight" />}
                iconOnly
                label={isLastPage ? 'Last page' : `Next page (${value + 1})`}
                onClick={nextPage}
                owner="pagination"
                size="small"
                variant="tertiary"
            />
        </span>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
