import './progression-stepper.scss';
import { SvgCheck } from '@bspk/icons/Check';
import { ElementProps } from '-/types/common';

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
     *     [{ name: 'Name of step 1' }, { name: 'Name of step 2' }, { name: 'Name of step 3' }];
     *
     * @type Array<ProgressionStepperItem>
     * @required
     */
    steps: ProgressionStepperItem[];
    /**
     * The last completed step in the progress bar. This is only applicable for the 'widget' variant.
     *
     * @default 0
     * @minimum 0
     */
    completedStep?: number;
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
 *     function Example() {
 *         return <ProgressionStepper steps={[{ name: 'Step 1' }, { name: 'Step 2' }, { name: 'Step 3' }]} />;
 *     }
 *
 * @name ProgressionStepper
 * @phase UXReview
 */
export function ProgressionStepper({
    steps = [],
    completedStep: completedStepProp = 0,
    variant = 'horizontal',
    ...containerProps
}: ElementProps<ProgressionStepperProps, 'div'>) {
    const completedStepNumber = Math.max(0, Math.min(completedStepProp, steps.length));

    const currentStepNumber = Math.min(completedStepNumber + 1, steps.length);

    const currentStep = steps[currentStepNumber - 1];

    if (!steps?.length) return null;

    return (
        <div {...containerProps} data-bspk="progression-stepper" data-variant={variant}>
            {variant === 'widget' && (
                <label>
                    <span data-title>{currentStep.name}</span>
                    <span data-subtitle>
                        {currentStep?.subtext ||
                            (completedStepNumber === steps.length ? (
                                'Completed'
                            ) : (
                                <>
                                    Step {currentStepNumber} of {steps.length}
                                </>
                            ))}
                    </span>
                </label>
            )}
            <ol>
                {steps.map(({ name, subtext }, index) => {
                    const stepNum = index + 1;
                    let status: 'complete' | 'current' | 'incomplete' = 'incomplete';
                    if (completedStepNumber >= stepNum) status = 'complete';
                    else if (completedStepNumber + 1 === stepNum) status = 'current';

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
