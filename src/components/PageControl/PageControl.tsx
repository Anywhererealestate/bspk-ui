import './page-control.scss';
import { PageControlDot } from './PageControlDot';

const MAX_DOT_COUNT = 5;

export type PageControlProps = {
    /**
     * The current page number.
     *
     * @default 1
     * @required
     * @minimum 1
     */
    value: number;

    /**
     * The total number of pages.
     *
     * @default 5
     * @required
     * @minimum 2
     */
    numPages: number;
    /**
     * The variant of the page-control.
     *
     * @default 'flat'
     */
    variant?: 'flat' | 'floating';
};

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
    const dots = [];

    // only do fancy dots if numPages is greater than 5
    if (numPages <= 5) {
        const numDots = Math.min(numPages, MAX_DOT_COUNT);
        for (let i = 1; i <= numDots; i++) {
            dots.push(<PageControlDot active={i === value} key={i} size="large" />);
        }
    } else {
        const valueDiffToStart = value - 1;
        const valueDiffToEnd = numPages - value;

        const isValueWithinTwoOfStart = valueDiffToStart <= 2;
        const isValueWithinTwoOfEnd = valueDiffToEnd <= 2;
        const isValueWithinTwoOfEdge = isValueWithinTwoOfStart || isValueWithinTwoOfEnd;

        // unless the value is within two of either edge, the active dot is always the center one
        const activeDotIndex = isValueWithinTwoOfEdge
            ? isValueWithinTwoOfStart
                ? valueDiffToStart + 1
                : 5 - valueDiffToEnd
            : 3;

        for (let i = 1; i <= 5; i++) {
            const isActive = i === activeDotIndex;
            let size: 'large' | 'medium' | 'small' = 'small';

            // If the value is close to the edge the center and two dots on that edge are large, the dot one inward from center is medium, and the innermost dot is small.
            if (isValueWithinTwoOfEdge) {
                if (isValueWithinTwoOfStart) {
                    if (i <= 3) {
                        size = 'large';
                    } else if (i === 4) {
                        size = 'medium';
                    }
                } else if (isValueWithinTwoOfEnd) {
                    if (i >= 3) {
                        size = 'large';
                    } else if (i === 2) {
                        size = 'medium';
                    }
                }
            } else {
                // If the center dot is active only it is large, adjacent dots are medium, and all others are small.
                if (i === 3) {
                    size = 'large';
                }

                if (i === activeDotIndex - 1 || i === activeDotIndex + 1) {
                    size = 'medium';
                }
            }

            dots.push(<PageControlDot active={isActive} key={i} size={size} />);
        }
    }

    return (
        <span
            aria-label={`Page ${value} of ${numPages}`}
            data-bspk="page-control"
            data-variant={variant || undefined}
            role="img"
        >
            {dots}
        </span>
    );
}

PageControl.bspkName = 'PageControl';

export { PageControl };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
