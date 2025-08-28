import './progression-stepper.scss';
import { SvgCheck } from '@bspk/icons/Check';
import { ElementAttributes } from '-/types/common';

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

export type ProgressionStepperProps = ElementAttributes<
    'div',
    {
        /**
         * The steps to display in the progress bar.
         *
         * @example
         *     [{ name: 'Name of step 1' }, { name: 'Name of step 2' }, { name: 'Name of step 3' }];
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
    }
>;

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
 * @phase UXReview
 */
export function ProgressionStepper({
    steps = [],
    currentStep: currentStepProp = 0,
    variant = 'horizontal',
    elementAttributes,
}: ProgressionStepperProps) {
    const currentStep = Math.max(0, Math.min(currentStepProp, steps.length + 1));
    return !steps?.length ? null : (
        <div {...elementAttributes} data-bspk="progression-stepper" data-variant={variant}>
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
                {steps.map(({ name, subtext }, index) => {
                    const stepNum = index + 1;
                    let status: 'complete' | 'current' | 'incomplete' = 'incomplete';
                    if (currentStep > stepNum) status = 'complete';
                    else if (currentStep === stepNum) status = 'current';

                    return (
                        <li
                            aria-current={status === 'current' ? 'step' : undefined}
                            data-status={status}
                            data-step={stepNum}
                            key={`step-${index}`}
                        >
                            <span data-line-circle>
                                <span data-line="before" />
                                <span data-circle>
                                    {status === 'complete' ? (
                                        <SvgCheck aria-hidden={true} />
                                    ) : (
                                        (variant !== 'widget' || status === 'current') && <span>{stepNum}</span>
                                    )}
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

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
