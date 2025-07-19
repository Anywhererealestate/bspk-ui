import { ProgressCircleSVG } from './ProgressCircleSVG';
import { Txt } from '-/components/Txt';
import { useId } from '-/hooks/useId';
import { TxtVariant } from '-/utils/txtVariants';

import './progress-circle.scss';

export type ProgressCircleProps = {
    /** The label of the progress circle. */
    label: string;
    /**
     * The size of the label and progress circle.
     *
     * @default medium
     */
    size?: 'large' | 'medium' | 'small';
    /**
     * The position of the label in relation to the progress circle.
     *
     * @default bottom
     */
    labelPosition?: 'bottom' | 'left' | 'right' | 'top';
};

/**
 * Rotating circle or pill that indicates the status or state of completion for a process that’s part of a user flow.
 *
 * @example
 *     import { ProgressCircle } from '@bspk/ui/ProgressCircle';
 *
 *     export function Example() {
 *         return <ProgressCircle label="Example label" />;
 *     }
 *
 * @name ProgressCircle
 * @phase AccessibilityReview
 */
function ProgressCircle({ label, labelPosition, size = 'medium' }: ProgressCircleProps) {
    let variant: TxtVariant = 'labels-base';

    if (size === 'small') variant = 'labels-small';
    else if (size === 'large') variant = 'labels-large';

    const labelId = useId();

    return (
        <div
            aria-labelledby={labelId}
            data-bspk="progress-circle"
            data-label-position={labelPosition}
            data-size={size}
            role="progressbar"
        >
            <ProgressCircle.SVG />
            <Txt id={labelId} variant={variant}>
                {label || 'Loading ...'}
            </Txt>
        </div>
    );
}

ProgressCircle.bspkName = 'ProgressCircle';

export { ProgressCircle };

ProgressCircle.SVG = ProgressCircleSVG;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
