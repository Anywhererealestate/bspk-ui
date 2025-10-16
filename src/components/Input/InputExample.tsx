import { InputProps } from '.';
import { Field, FieldLabel } from '-/components/Field';
import { ComponentExample } from '-/utils/demo';

export const InputExample: ComponentExample<InputProps> = {
    render: ({ props, Component }) => (
        <Field>
            <FieldLabel>Example Input</FieldLabel>
            <Component {...props} />
        </Field>
    ),
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
