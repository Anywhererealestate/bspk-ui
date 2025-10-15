import './progress-stepper-bar.scss';
import { cssWithVars } from '-/utils/cwv';

export type ProgressStepperBarProps = {
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
 * * @name ProgressStepperBar * * @phase UXReview
 */
export function ProgressStepperBar({
    stepCount,
    stepCompleted: stepCompletedProp = 0,
    size = 'large',
    ...containerProps
}: ProgressStepperBarProps) {
    const stepCompleted = Math.min(stepCompletedProp, stepCount);

    return (
        <div
            data-bspk="progress-stepper-bar"
            data-size={size}
            style={cssWithVars({ '--steps': stepCount })}
            {...containerProps}
        >
            <div data-steps>
                {Array.from({ length: stepCount }, (_, i) => (
                    <div data-complete={i < stepCompleted || undefined} data-step={i} key={i} />
                ))}
            </div>
            <span data-label>
                {String(stepCompleted)} of {String(stepCount)} steps completed.
            </span>
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
