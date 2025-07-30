import { useMemo } from 'react';
import './progress-stepper.scss';
import { ProgressStepperStep } from './ProgressStepperStep';

export type StepperStep = {
    /**
     * The step number of the step.
     *
     * @required
     * @minimum 1
     */
    stepNumber: number;
    /**
     * The label for the step.
     *
     * @required
     */
    label: string;
};

export type ProgressStepperProps = {
    /**
     * Array of steps in the progress stepper.
     *
     * @required
     */
    steps: StepperStep[];
    /**
     * The current active step number.
     *
     * @default 0
     * @required
     */
    value: number;
};

/**
 * A series of milestones that provides an overview of complex process or multistep flow. Progress steppers help guide
 * and encourage users as they use the application.
 *
 * @example
 *     import { ProgressStepper } from '@bspk/ui/ProgressStepper';
 *
 *     function Example() {
 *         return (
 *             <ProgressStepper
 *                 steps={[
 *                     { stepNumber: 1, label: 'Step 1' },
 *                     { stepNumber: 2, label: 'Step 2' },
 *                     { stepNumber: 3, label: 'Step 3' },
 *                     { stepNumber: 4, label: 'Step 4' },
 *                     { stepNumber: 5, label: 'Step 5' },
 *                 ]}
 *                 value={3}
 *             />
 *         );
 *     }
 *
 * @name ProgressStepper
 * @phase Dev
 */
function ProgressStepper({ steps, value = 0 }: ProgressStepperProps) {
    const stepComponents = useMemo(() => {
        return steps.map((step) => {
            let state: 'active' | 'completed' | 'inactive';

            if (value > step.stepNumber) {
                state = 'completed';
            } else if (value === step.stepNumber) {
                state = 'active';
            } else {
                state = 'inactive';
            }

            return <ProgressStepperStep key={step.stepNumber} {...step} state={state} />;
        });
    }, [steps, value]);

    const percentCompleted = steps.length > 1 ? ((value - 1) / (steps.length - 1)) * 100 : 0;

    return (
        <div aria-label="Progress Stepper" data-bspk="progress-stepper" role="list">
            <div data-progress-stepper-background="" role="presentation">
                <div
                    data-progress-stepper-background-filled=""
                    style={{ width: `${Math.min(percentCompleted, 100)}%` }}
                />
            </div>

            {stepComponents}
        </div>
    );
}

ProgressStepper.bspkName = 'ProgressStepper';

export { ProgressStepper };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
