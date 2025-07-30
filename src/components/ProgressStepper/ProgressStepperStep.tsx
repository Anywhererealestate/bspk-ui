import { SvgCheck } from '@bspk/icons/Check';
import { StepperStep } from './ProgressStepper';
import { Txt } from '-/components/Txt';

type ProgressStepperStepProps = StepperStep & {
    state: 'active' | 'completed' | 'inactive';
    stepNumber: number;
};

export function ProgressStepperStep({ label, state, stepNumber }: ProgressStepperStepProps) {
    const badgeContent = state === 'completed' ? <SvgCheck /> : <Txt variant="labels-large">{stepNumber}</Txt>;

    return (
        <div data-progress-stepper-step="" data-state={state}>
            <div data-progress-stepper-step-badge="">{badgeContent}</div>

            <div data-progress-stepper-step-label="">{label}</div>
        </div>
    );
}
