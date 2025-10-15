import { InputProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const InputExample: ComponentExample<InputProps> = {
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
            },
        },
    ],
    variants: {
        type: false,
    },
};
