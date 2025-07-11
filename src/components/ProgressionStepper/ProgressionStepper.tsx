import { SvgCheck } from '@bspk/icons/Check';

import { ElementProps } from '-/types/common';
import './progression-stepper.scss';

/** A progress stepper item is a single step in the progress bar. */
export type ProgressionStepperItem = {
    /**
     * The name of the step.
     *
     * @type string
     * @required
     */
    name: string;
    /**
     * The subtext of the step.
     *
     * @type multiline
     */
    subtext?: string;
    /**
     * The link to navigate to when the step is clicked.
     *
     * @type {label: string; onClick: () => void}
     */
    touchLink?: { label: string; onClick: () => void };
};

export type ProgressionStepperProps = {
    /**
     * The steps to display in the progress bar.
     *
     * @example
     *     [
     *         { name: '[Name of step to proceed forward 1]' },
     *         { name: '[Name of step to proceed forward 2]' },
     *         { name: '[Name of step to proceed forward 3]' },
     *     ];
     *
     * @type Array<ProgressionStepperItem>
     * @required
     */
    steps: ProgressionStepperItem[];
    /**
     * The current step in the progress bar.
     *
     * If the current step is greater than the number of steps, all steps with be completed.
     *
     * If the current step is less than 1, all steps will be incomplete.
     *
     * @default 0
     * @minimum 0
     */
    currentStep?: number;
    /**
     * The variant of the progress bar. Can be either horizontal, vertical, or widget.
     *
     * When on small width screens, the default will automatically switch to widget.
     *
     * @default horizontal
     */
    variant?: 'horizontal' | 'vertical' | 'widget';
};

/**
 * A progress stepper is a horizontal visual indicator that let’s the user know the progression of the current process.
 *
 * @example
 *     import { ProgressionStepper } from '@bspk/ui/ProgressionStepper';
 *
 *     export function Example() {
 *         return <ProgressionStepper steps={[{ name: 'Step 1' }, { name: 'Step 2' }, { name: 'Step 3' }]} />;
 *     }
 *
 * @name ProgressionStepper
 * @phase Backlog
 */
function ProgressionStepper({
    steps = [],
    currentStep: currentStepProp = 0,
    variant = 'horizontal',
    ...containerProps
}: ElementProps<ProgressionStepperProps, 'div'>) {
    const currentStep = Math.max(0, Math.min(currentStepProp, steps.length + 1));
    return !steps?.length ? null : (
        <div {...containerProps} data-bspk="progression-stepper" data-variant={variant}>
            {variant === 'widget' && (
                <label>
                    <span data-title>{steps[Math.max(0, Math.min(currentStep - 1, steps.length - 1))].name}</span>
                    <span data-subtitle>
                        {currentStep >= steps.length ? (
                            'Completed'
                        ) : (
                            <>
                                Step {currentStep} of {steps.length}
                            </>
                        )}
                    </span>
                </label>
            )}
            <ol>
                {steps.flatMap(({ name, subtext }, index) => {
                    const stepNum = index + 1;
                    let status: 'complete' | 'current' | 'incomplete' = 'incomplete';
                    if (stepNum < currentStep) status = 'complete';
                    else if (stepNum === currentStep) status = 'current';

                    return (
                        <li data-status={status} data-step={stepNum} key={`step-${index}`}>
                            <span aria-hidden data-line-circle>
                                <span data-line="before" />
                                <span data-circle>
                                    <span>{stepNum}</span>
                                    {status === 'complete' && <SvgCheck />}
                                </span>
                                <span data-line="after" />
                            </span>
                            {variant !== 'widget' && (
                                <span data-content>
                                    <span data-name>{name}</span>
                                    {subtext && <span data-subtext>{subtext}</span>}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

ProgressionStepper.bspkName = 'ProgressionStepper';

export { ProgressionStepper };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
