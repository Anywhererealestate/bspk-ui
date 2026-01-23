import { RadioGroupProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';
import { randomString } from '-/utils/random';

export const presets: Preset<RadioGroupProps>[] = [
    {
        label: 'With Descriptions',
        propState: {
            value: 'option2',
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
            ['aria-label']: 'Radio group',
            name: 'Radio group',
        },
    },
    {
        label: 'Group disabled',
        propState: {
            value: 'option2',
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
            ['aria-label']: 'Radio group',
            name: 'Radio group',
        },
    },
    {
        label: 'Long labels',
        propState: {
            value: 'option2',
            disabled: false,
            options: [
                { label: 'This is a very long label for option 1 that never seems to end', value: 'option1' },
                { label: 'This is a very long label for option 2 that never seems to end.', value: 'option2' },
                { label: 'This is a very long label for option 3', value: 'option3' },
            ],
            ['aria-label']: 'Radio group',
            name: 'Radio group',
        },
    },
    {
        label: 'Long labels + long descriptions',
        propState: {
            value: 'option2',
            disabled: false,
            options: [
                {
                    label: 'This is a very long label for option 1 that never seems to end',
                    description: 'This is a very long label for option 1 that never seems to end.',
                    value: 'option1',
                },
                {
                    label: 'This is a very long label for option 2 that never seems to end',
                    description:
                        'This is a very long label for option 1 that never seems to end. This is a very long label for option 2 that never seems to end. This is a very long label for option 2 that never seems to end',
                    value: 'option2',
                },
                {
                    label: 'This is a very long label for option 3',
                    description:
                        'This is a very long label for option 1 that never seems to end. This is a very long label for option 2 that never seems to end. This is a very long label for option 2 that never seems to end',
                    value: 'option3',
                },
            ],
            ['aria-label']: 'Radio group',
            name: 'Radio group',
        },
    },
];

export const RadioGroupExample: ComponentExample<RadioGroupProps> = {
    presets,
    render: ({ props, Component }) => {
        const id = randomString();
        return <Component {...props} id={id} name={props.name + id} />;
    },
    defaultState: {
        value: 'option3',
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
    },
};
