import { useState } from 'react';
import { InputPhone, InputPhoneProps } from '.';
import { Field } from '-/components/Field';
import { Preset, ComponentExample } from '-/utils/demo';

export const presets: Preset<InputPhoneProps>[] = [];

export const InputPhoneExample: ComponentExample<InputPhoneProps> = {
    containerStyle: { width: 320, padding: 0 },
    defaultState: {
        'aria-label': 'input phone aria-label',
    },
    render: ({ props, Component }) => <Component {...props} />,
    variants: true,
};

export const Usage = () => {
    const [value, onChange] = useState<string | undefined>();

    return (
        <div style={{ width: 320 }}>
            <Field
                controlId="example-input-phone"
                helperText="The phone input allows you to enter a phone number with country code."
                label="Example Input Phone"
            >
                <InputPhone
                    aria-label="Phone Number"
                    id="example-input-phone"
                    initialCountryCode="US"
                    name="example-name"
                    onChange={onChange}
                    value={value}
                />
            </Field>
        </div>
    );
};
