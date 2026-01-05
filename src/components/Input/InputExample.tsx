import { useState } from 'react';
import { Input, InputProps } from '.';
import { Field } from '-/components/Field';
import { ComponentExample } from '-/utils/demo';

export type InputExampleProps = InputProps & { label: string; description?: string };

export const InputExample: ComponentExample<InputExampleProps> = {
    containerStyle: { width: 320, padding: 0 },
    defaultState: {
        label: 'Property Description',
        'aria-label': 'input aria-label',
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
    sections: [],
};

export const Usage = () => {
    const [value, setValue] = useState<string>();

    return (
        <div style={{ width: 320 }}>
            <Field controlId="example-control-id" helperText="This is an example input field." label="Example Input">
                <Input id="example-control-id" name="example-name" onChange={setValue} value={value} />
            </Field>
        </div>
    );
};
