import { ProgressionStepperProps } from '../../ProgressionStepper';
import { ComponentExample } from '../utils';

export const ProgressionStepperExample: ComponentExample<ProgressionStepperProps> = {
    presets: [
        {
            label: 'Horizontal',
            propState: {
                variant: 'horizontal',
                currentStep: 2,
                steps: [{ name: 'Name of step 1' }, { name: 'Name of step 2' }, { name: 'Name of step 3' }],
            },
        },
        {
            label: 'Vertical',
            propState: {
                variant: 'vertical',
                currentStep: 2,
                steps: [
                    {
                        name: 'Name of step 1',
                        subtext: `Subtext of step 1`,
                    },
                    {
                        name: 'Name of step 2',
                        subtext: `Subtext of step 2`,
                    },
                    {
                        name: 'Name of step 3',
                        subtext: `Subtext of step 3`,
                    },
                ],
            },
        },
        {
            label: 'Widget',
            propState: {
                variant: 'widget',
                currentStep: 2,
                steps: [
                    { name: 'Name of step 1' },
                    { name: 'Name of step 2' },
                    { name: 'Name of step 3' },
                    { name: 'Name of step 4' },
                    { name: 'Name of step 5' },
                    { name: 'Name of step 6' },
                    { name: 'Name of step 7' },
                ],
            },
        },
    ],
};
