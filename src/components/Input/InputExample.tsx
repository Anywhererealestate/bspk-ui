import { InputProps } from '.';
import { Field, FieldDescription, FieldLabel } from '-/components/Field';
import { ComponentExample } from '-/utils/demo';

type InputExampleProps = InputProps & { label: string; description?: string };

export const InputExample: ComponentExample<InputExampleProps> = {
    defaultState: {
        label: 'Property Description',
        description: 'This is a description of the property.',
        placeholder: 'Waterfront condo with great views',
    },
    render: ({ props, Component }) => (
        <Field>
            <FieldLabel>{props.label || 'Example Input'}</FieldLabel>
            <Component {...props} />
            {props.description && <FieldDescription>{props.description}</FieldDescription>}
        </Field>
    ),
    presets: [
        {
            label: 'Currency',
            propState: {
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
