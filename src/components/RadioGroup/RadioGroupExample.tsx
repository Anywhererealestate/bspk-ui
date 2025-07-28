import { RadioGroupProps } from '.';
import { RadioExample } from '-/components/Radio/RadioExample';
import { ComponentExample } from '-/utils/demo';

export const RadioGroupExample: ComponentExample<RadioGroupProps> = {
    render: RadioExample.render,
    presets: [
        {
            label: 'With Descriptions',
            propState: {
                options: [
                    {
                        label: 'Option 1',
                        value: 'option1',
                        description: 'Description for option 1',
                        name: 'example 1',
                        onChange: () => {},
                    },
                    {
                        label: 'Option 2',
                        value: 'option2',
                        description: 'Description for option 2',
                        name: 'example 2',
                        onChange: () => {},
                    },
                    {
                        label: 'Option 3',
                        value: 'option3',
                        description: 'Description for option 3',
                        name: 'example 3',
                        onChange: () => {},
                    },
                ],
            },
        },
        {
            label: 'Long labels',
            propState: {
                options: [
                    {
                        label: 'This is a very long label for option 1 that never seems to end',
                        value: 'option1',
                        name: 'example 1',
                        onChange: () => {},
                    },
                    {
                        label: 'This is a very long label for option 2 that never seems to end',
                        value: 'option2',
                        name: 'example 2',
                        onChange: () => {},
                    },
                    {
                        label: 'This is a very long label for option 3',
                        value: 'option3',
                        name: 'example 3',
                        onChange: () => {},
                    },
                ],
            },
        },
        {
            label: 'One Item Disabled',
            propState: {
                options: [
                    {
                        label: 'Option 1',
                        value: 'option1',
                        description: 'Description for option 1',
                        name: 'example 1',
                        onChange: () => {},
                    },
                    {
                        label: 'Option 2',
                        value: 'option2',
                        description: 'Description for option 2',
                        disabled: true,
                        name: 'example 2',
                        onChange: () => {},
                    },
                    {
                        label: 'Option 3',
                        value: 'option3',
                        description: 'Description for option 3',
                        name: 'example 1',
                        onChange: () => {},
                    },
                ],
            },
        },
    ],
};
