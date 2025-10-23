import { InputProps } from '.';
import { ComponentExample } from '-/utils/demo';

type InputExampleProps = InputProps & { label: string; description?: string };

export const InputExample: ComponentExample<InputExampleProps> = {
    defaultState: {
        label: 'Property Description',
        description: 'This is a description of the property.',
        placeholder: 'Waterfront condo with great views',
    },
    render: ({ props, Component }) => <Component {...props} />,
    presets: [
        {
            label: 'Currency',
            propState: {
                value: '',
                type: 'number',
                leading: '$',
                trailing: undefined,
                placeholder: '0.00',
                name: 'currency',
                label: 'Balance',
                description: 'Enter the current balance',
            },
        },
        {
            label: 'Percent',
            propState: {
                value: '',
                type: 'number',
                leading: undefined,
                trailing: '%',
                placeholder: '0',
                name: 'percent',
                label: 'Growth Rate',
                description: 'Enter the expected growth rate',
            },
        },
        {
            label: 'Dimension',
            propState: {
                value: '',
                type: 'number',
                leading: undefined,
                placeholder: '0',
                trailing: 'Acre(s)',
                name: 'dimension',
                label: 'Land Size',
                description: 'Enter the size of the land',
            },
        },
    ],
    variants: {
        type: false,
    },
};
