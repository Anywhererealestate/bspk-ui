import { useState } from 'react';
import { TextField, TextFieldProps } from '-/components/TextField';
import '-/components/PasswordInput/password-input.scss';

export type PasswordFieldProps = Pick<
    TextFieldProps,
    | 'controlId'
    | 'disabled'
    | 'errorMessage'
    | 'invalid'
    | 'label'
    | 'name'
    | 'onChange'
    | 'readOnly'
    | 'size'
    | 'value'
>;

/**
 * An input field that is specifically built with a show/hide toggle for entering security passwords.
 *
 * @example
 *     import { Password } from '@bspk/ui/Password';
 *     import { useState } from 'react';
 *
 *     function Example() {
 *         const [value, setValue] = useState('');
 *
 *         return <Password value={value} onChange={setValue} />;
 *     }
 *
 * @name PasswordField
 * @phase Dev
 */
function PasswordField({ disabled, readOnly, label, ...restTextFieldProps }: PasswordFieldProps) {
    const [isShowingPassword, setIsShowingPassword] = useState(false);

    const togglePasswordVisibility =
        disabled || readOnly
            ? undefined
            : () => {
                  setIsShowingPassword((prev) => !prev);
              };

    return (
        <span data-bspk="password-input">
            <TextField
                aria-label={label}
                disabled={disabled}
                label={label}
                readOnly={readOnly}
                showClearButton={false}
                trailing={
                    <button data-toggle-visibility-button onClick={togglePasswordVisibility}>
                        {isShowingPassword ? 'Hide' : 'Show'}
                    </button>
                }
                type={isShowingPassword ? 'text' : 'password'}
                {...restTextFieldProps}
            />
        </span>
    );
}

PasswordField.bspkName = 'Password';

export { PasswordField };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
