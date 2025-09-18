import './page-control.scss';

const MAX_DOT_COUNT = 5 as const;

export type PageControlProps = {
    /**
     * The current page index (zero-based).
     *
     * @example
     *     0;
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
 * @phase UXReview
 */
export function PageControl({ value, numPages, variant = 'flat' }: PageControlProps) {
    if (numPages < 2) return null;

    return (
        <span
            aria-label={`Page ${value + 1} of ${numPages}`}
            data-bspk="page-control"
            data-variant={variant || undefined}
            role="img"
        >
            {getDots(value, numPages).map(({ pageIndex, size }, index) => (
                <span
                    aria-hidden="true"
                    data-active={pageIndex === Number(value) || undefined}
                    data-dot={pageIndex}
                    data-size={size}
                    key={index + 1}
                    role="presentation"
                />
            ))}
        </span>
    );
}

function getDots(currentIndex: number, totalPages: number) {
    if (totalPages <= MAX_DOT_COUNT) {
        return Array.from({ length: totalPages }, (_, i) => ({
            size: 'medium' as DotSize,
            pageIndex: i,
        }));
    }
    const start = Math.max(0, Math.min(currentIndex - 2, totalPages - MAX_DOT_COUNT));
    return Array.from({ length: MAX_DOT_COUNT }, (_, i) => {
        const pageIndex = start + i;
        let size: DotSize = 'medium';

        if (i === 0 && pageIndex > 0) size = 'x-small';
        if (i === 1 && pageIndex > 1) size = 'small';
        if (i === 3 && pageIndex < totalPages - 2) size = 'small';
        if (i === 4 && pageIndex < totalPages - 1) size = 'x-small';

        return { pageIndex, size };
    });
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
