import { useMemo } from 'react';
import './page-control.scss';

const MAX_DOT_COUNT = 5 as const;

export type PageControlProps = {
    /**
     * The current page number.
     *
     * @example
     *     1;
     *
     * @required
     */
    value: number;

    /**
     * The total number of pages.
     *
     * @example
     *     5;
     *
     * @required
     */
    numPages: number;
    /**
     * The variant of the page-control.
     *
     * @default flat
     */
    variant?: 'flat' | 'floating';
};

type DotSize = 'medium' | 'small' | 'x-small';

/**
 * A visual indicator that displays a series of dots representing the number of pages or elements within a moving
 * carousel or flow. The active page is often differentiated with a usage of a high contrasting color.
 *
 * @example
 *     import { PageControl } from '@bspk/ui/PageControl';
 *
 *     function Example() {
 *         return <PageControl value={1} numPages={3} />;
 *     }
 *
 * @name PageControl
 * @phase WorkInProgress
 */
function PageControl({ value, numPages, variant = 'flat' }: PageControlProps) {
    const dots = getDots(value, numPages);

    if (dots.length < 2) return null;

    return (
        <span
            aria-label={`Page ${value} of ${numPages}`}
            data-bspk="page-control"
            data-variant={variant || undefined}
            role="presentation"
        >
            {dots.map(({ page, size }, index) => (
                <span
                    aria-hidden="true"
                    data-active={page === Number(value) || undefined}
                    data-dot={page}
                    data-size={size}
                    key={index + 1}
                />
            ))}
        </span>
    );
}

PageControl.bspkName = 'PageControl';

export { PageControl };

function getDots(currentPage: number, totalPages: number) {
    if (totalPages <= MAX_DOT_COUNT) {
        return Array.from({ length: totalPages }, (_, i) => ({
            size: 'medium' as DotSize,
            page: i + 1,
        }));
    }

    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));

    const dots = Array.from({ length: MAX_DOT_COUNT }, (_, i) => {
        const page = start + i;
        let size: DotSize = 'medium';

        if (i === 0 && page > 1) size = page > 1 ? 'x-small' : 'small';
        if (i === 1 && page > 2) size = 'small';
        if (i === 3 && page < totalPages - 1) size = 'small';
        if (i === 4 && page < totalPages) size = page < totalPages ? 'x-small' : 'small';

        return { page, size };
    });

    return dots;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
