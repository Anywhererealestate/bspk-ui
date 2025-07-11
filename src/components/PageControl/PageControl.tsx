import './page-control.scss';
import { PageControlDot } from './PageControlDot';

const MAX_DOT_COUNT = 5;
const CENTER_DOT_POSITION = 3;

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

    // only do fancy dots if numPages is greater than the max dot count
    if (numPages <= MAX_DOT_COUNT) {
        for (let i = 1; i <= numPages; i++) {
            dots.push(<PageControlDot active={i === value} key={i} size="large" />);
        }
    } else {
        const valueDiffToStart = value - 1;
        const valueDiffToEnd = numPages - value;

        const isValueApproachingStart = valueDiffToStart <= CENTER_DOT_POSITION - 1;
        const isValueApproachingEnd = valueDiffToEnd <= CENTER_DOT_POSITION - 1;

        const isValueApproachingEdge = isValueApproachingStart || isValueApproachingEnd;

        // unless the value is approaching either edge, the active dot is always the center one
        const activeDotIndex = isValueApproachingEdge
            ? isValueApproachingStart
                ? valueDiffToStart + 1
                : MAX_DOT_COUNT - valueDiffToEnd
            : CENTER_DOT_POSITION;

        for (let i = 1; i <= MAX_DOT_COUNT; i++) {
            const isActive = i === activeDotIndex;
            let size: 'large' | 'medium' | 'small' = 'small';

            // If the value is close to the edge the center and dots on that edge are large, the dot one inward from center is medium, and the innermost dots are small.
            if (isValueApproachingEdge) {
                if (isValueApproachingStart) {
                    if (i <= CENTER_DOT_POSITION) {
                        size = 'large';
                    } else if (i === CENTER_DOT_POSITION + 1) {
                        size = 'medium';
                    }
                } else if (isValueApproachingEnd) {
                    if (i >= CENTER_DOT_POSITION) {
                        size = 'large';
                    } else if (i === CENTER_DOT_POSITION - 1) {
                        size = 'medium';
                    }
                }
            } else {
                // If the center dot is active only it is large, adjacent dots are medium, and all others are small.
                if (i === CENTER_DOT_POSITION) {
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
