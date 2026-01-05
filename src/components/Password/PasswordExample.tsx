import { useState } from 'react';
import { Password, PasswordProps } from '.';
import { Field } from '-/components/Field';
import { ComponentExample } from '-/utils/demo';

export const PasswordExample: ComponentExample<PasswordProps> = {
    defaultState: {
        'aria-label': 'password aria-label',
    },
    containerStyle: { width: 320, padding: 0 },
};

export const Usage = () => {
    const [value, setValue] = useState<string | undefined>('');

    return (
        <div>
            <Field
                controlId="example-password"
                helperText="The password field allows you to enter a secure password."
                label="Password"
            >
                <Password
                    aria-label="password"
                    id="example-password"
                    name="password"
                    onChange={(next) => setValue(next)}
                    value={value}
                />
            </Field>
        </div>
    );
};
