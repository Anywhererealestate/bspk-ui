import { useState } from 'react';
import { InputPhone, InputPhoneProps } from '.';
import { Field, FieldDescription, FieldLabel } from '-/components/Field';
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
            <Field>
                <FieldLabel>Example Input Phone</FieldLabel>
                <InputPhone
                    aria-label="Phone Number"
                    initialCountryCode="US"
                    name="example-name"
                    onChange={onChange}
                    value={value}
                />
                <FieldDescription>
                    The phone input allows you to enter a phone number with country code.
                </FieldDescription>
            </Field>
        </div>
    );
};
