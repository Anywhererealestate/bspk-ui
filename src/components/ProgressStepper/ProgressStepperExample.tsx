import { ProgressStepperProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const ProgressStepperExample: ComponentExample<ProgressStepperProps> = {
    render: ({ Component, props }) => {
        return (
            <Component
                steps={[
                    { stepNumber: 1, label: 'Step 1' },
                    { stepNumber: 2, label: 'Step 2' },
                    { stepNumber: 3, label: 'Step 3' },
                    { stepNumber: 4, label: 'Step 4' },
                    { stepNumber: 5, label: 'Step 5' },
                ]}
                value={props.value}
            />
        );
    },
    hideVariants: true,
};
