import { TextInputProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const TextInputExample: ComponentExample<TextInputProps> = {
    render: ({ props, Component }) => <Component {...props} />,
    presets: [
        {
            label: 'Currency',
            propState: {
                type: 'number',
                leading: '$',
                trailing: undefined,
                placeholder: 'currency',
                name: 'currency',
                'aria-label': 'Currency input',
            },
        },
        {
            label: 'Percent',
            propState: {
                type: 'number',
                leading: undefined,
                trailing: '%',
                placeholder: 'percent',
                name: 'percent',
                'aria-label': 'Percent input',
            },
        },
        {
            label: 'Dimension',
            propState: {
                type: 'number',
                leading: undefined,
                placeholder: 'dimensions',
                trailing: 'ft',
                name: 'dimension',
                'aria-label': 'Dimension input',
            },
        },
    ],
    variants: {
        type: false,
    },
};
