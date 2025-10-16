import { RadioGroupProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';
import { randomString } from '-/utils/random';

export const presets: Preset<RadioGroupProps>[] = [
    {
        label: 'With subTexts',
        propState: {
            disabled: false,
            options: [
                { label: 'Option 1', value: 'option1' },
                {
                    label: 'Option 2',
                    value: 'option2',

                    disabled: true,
                },
                { label: 'Option 3', value: 'option3' },
            ],
            name: 'Checkbox group',
            value: 'option2',
        },
    },
    {
        label: 'Group disabled',
        propState: {
            disabled: true,
            options: [
                { label: 'Option 1', value: 'option1' },
                {
                    label: 'Option 2',
                    value: 'option2',
                },
                { label: 'Option 3', value: 'option3' },
            ],
            name: 'Checkbox group',
            value: 'option2',
        },
    },
    {
        label: 'Long labels',
        propState: {
            disabled: false,
            options: [
                { label: 'This is a very long label for option 1 that never seems to end', value: 'option1' },
                { label: 'This is a very long label for option 2 that never seems to end', value: 'option2' },
                { label: 'This is a very long label for option 3', value: 'option3' },
            ],
            name: 'Checkbox group',
            value: 'option2',
        },
    },
];

export const RadioGroupExample: ComponentExample<RadioGroupProps> = {
    presets,
    render: ({ props, Component }) => {
        const id = `radio-group-example-${randomString(5)}`;

        return <Component {...props} id={id} />;
    },
    variants: false,
};
