import { cssWithVars } from '-/utils/cwv';

import './progression-stepper-bar.scss';

export type ProgressionStepperBarProps = {
    /**
     * The number of steps in the progress bar.
     *
     * @example
     *     5;
     *
     * @minimum 2
     * @maximum 10
     * @required
     */
    stepCount: number;
    /**
     * The last step completed.
     *
     * @example
     *     2;
     *
     * @default 0
     * @minimum 0
     */
    stepCompleted?: number;
    /**
     * The size of the progress bar.
     *
     * @default large
     */
    size?: 'large' | 'small';
};

/**
 * Component description coming soon.
 *
 * @name ProgressionStepperBar
 * @phase UXReview
 */
export function ProgressionStepperBar({
    stepCount,
    stepCompleted: stepCompletedProp = 0,
    size = 'large',
}: ProgressionStepperBarProps) {
    const stepCompleted = Math.min(stepCompletedProp, stepCount);

    return (
        <div data-bspk="progression-stepper-bar" data-size={size} style={cssWithVars({ '--steps': stepCount })}>
            <div data-steps>
                {Array.from({ length: stepCount }, (_, i) => (
                    <div data-complete={i < stepCompleted || undefined} data-step={i} key={i} />
                ))}
            </div>
            <span data-label>
                {stepCompleted} of {stepCount} steps completed.
            </span>
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
