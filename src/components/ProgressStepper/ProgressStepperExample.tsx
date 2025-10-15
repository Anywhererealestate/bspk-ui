import { ProgressStepperProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<ProgressStepperProps>[] = [
    {
        label: 'Horizontal',
        propState: {
            variant: 'horizontal',
            completedStep: 2,
            steps: [{ name: 'Name of step 1' }, { name: 'Name of step 2' }, { name: 'Name of step 3' }],
        },
    },
    {
        label: 'Vertical',
        propState: {
            variant: 'vertical',
            completedStep: 2,
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
            completedStep: 3,
            steps: [
                { name: 'Name of step 1' },
                { name: 'Name of step 2' },
                { name: 'Name of step 3' },
                { name: 'Name of step 4' },
                { name: 'Name of step 5' },
                { name: 'Name of step 6' },
                { name: 'Review' },
            ],
        },
    },
    {
        label: 'Widget (w/ subtext)',
        propState: {
            variant: 'widget',
            completedStep: 3,
            steps: [
                { name: 'Name of step 1' },
                { name: 'Name of step 2' },
                { name: 'Name of step 3' },
                { name: 'Name of step 4' },
                { name: 'Name of step 5' },
                { name: 'Name of step 6' },
                { name: 'Review', subtext: `Check your information...` },
            ],
        },
    },
];

export const ProgressStepperExample: ComponentExample<ProgressStepperProps> = {
    containerStyle: { width: '100%' },
    presets,
};
