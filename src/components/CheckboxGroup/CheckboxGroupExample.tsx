import { CheckboxGroupProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<CheckboxGroupProps>[] = [
    {
        label: 'With Descriptions',
        propState: {
            value: ['option2'],
            disabled: false,
            options: [
                { label: 'Option 1', value: 'option1', description: 'Description for option 1' },
                {
                    label: 'Option 2',
                    value: 'option2',
                    description: 'Description for option 2 (disabled)',
                    disabled: true,
                },
                { label: 'Option 3', value: 'option3', description: 'Description for option 3' },
            ],
            ['aria-label']: 'Checkbox group',
            name: 'Checkbox group',
        },
    },
    {
        label: 'Group disabled',
        propState: {
            value: ['option2'],
            disabled: true,
            options: [
                { label: 'Option 1', value: 'option1', description: 'Description for option 1' },
                {
                    label: 'Option 2',
                    value: 'option2',
                    description: 'Description for option 2 (disabled)',
                },
                { label: 'Option 3', value: 'option3', description: 'Description for option 3' },
            ],
            ['aria-label']: 'Checkbox group',
            name: 'Checkbox group',
        },
    },
    {
        label: 'Long labels',
        propState: {
            value: ['option2'],
            disabled: false,
            options: [
                { label: 'This is a very long label for option 1 that never seems to end', value: 'option1' },
                { label: 'This is a very long label for option 2 that never seems to end', value: 'option2' },
                { label: 'This is a very long label for option 3', value: 'option3' },
            ],
            ['aria-label']: 'Checkbox group',
            name: 'Checkbox group',
        },
    },
];

export const CheckboxGroupExample: ComponentExample<CheckboxGroupProps> = {
    presets,
    defaultState: {
        selectAll: true,
        options: [
            { label: 'Option 1', value: 'option1', description: 'Description for option 1' },
            {
                label: 'Option 2',
                value: 'option2',
                description: 'Description for option 2 (disabled)',
                disabled: true,
            },
            { label: 'Option 3', value: 'option3', description: 'Description for option 3' },
            {
                label: 'Option 4',
                value: 'option4',
                description:
                    'This is a very long label for option 4 that never seems to end and just goes on and on without stopping',
            },
        ],
    },
};
