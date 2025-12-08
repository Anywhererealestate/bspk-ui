import { useState } from 'react';
import { Password, PasswordProps } from '.';
import { Field, FieldLabel, FieldDescription } from '-/components/Field';
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
            <Field>
                <FieldLabel>Password</FieldLabel>
                <Password aria-label="password" name="password" onChange={(next) => setValue(next)} value={value} />
                <FieldDescription>The password field allows you to enter a secure password.</FieldDescription>
            </Field>
        </div>
    );
};
