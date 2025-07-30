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
        <div
            aria-label={`Step ${stepNumber}: ${label} (${state})`}
            data-progress-stepper-step=""
            data-state={state}
            role="listitem"
        >
            <div data-progress-stepper-step-badge="">{badgeContent}</div>

            <div data-progress-stepper-step-label="">{label}</div>
        </div>
    );
}
