import { useState } from 'react';
import { InputNumber, InputNumberProps } from './InputNumber';
import { Field } from '-/components/Field';
import { ComponentExample } from '-/utils/demo';

export const InputNumberExample: ComponentExample<InputNumberProps> = {
    defaultState: {
        'aria-label': 'input number aria-label',
    },
    render: ({ props, Component }) => <Component {...props} />,
    variants: false,
    sections: [],
    containerStyle: { width: 320, padding: 0 },
};

export const Usage = () => {
    const [value, setValue] = useState<number | undefined>();

    return (
        <div style={{ width: 320 }}>
            <Field
                controlId="example-input-number"
                helperText="The input number allows you to increment or decrement a value."
                label="Example Input Number"
            >
                <InputNumber
                    aria-label="Example aria-label"
                    id="example-input-number"
                    name="example-name"
                    onChange={(nextValue) => setValue(nextValue)}
                    value={value}
                />
            </Field>
        </div>
    );
};
