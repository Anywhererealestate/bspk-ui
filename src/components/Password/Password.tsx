import { useState } from 'react';
import { TextField, TextFieldProps } from '-/components/TextField';
import './password.scss';

export type PasswordProps = Pick<
    TextFieldProps,
    'disabled' | 'invalid' | 'label' | 'name' | 'onChange' | 'readOnly' | 'size' | 'value'
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
 * @name Password
 * @phase Dev
 */
function Password({ disabled, readOnly, label, ...restTextFieldProps }: PasswordProps) {
    const [isShowingPassword, setIsShowingPassword] = useState(false);

    const togglePasswordVisibility =
        disabled || readOnly
            ? undefined
            : () => {
                  setIsShowingPassword((prev) => !prev);
              };

    return (
        <span data-bspk="password">
            <TextField
                aria-label={label}
                controlId="Example controlId"
                disabled={disabled}
                label={label}
                readOnly={readOnly}
                showClearButton={false}
                trailing={
                    <button
                        aria-label="Toggle password visibility"
                        data-toggle-visibility-button
                        onClick={togglePasswordVisibility}
                    >
                        {isShowingPassword ? 'Hide' : 'Show'}
                    </button>
                }
                type={isShowingPassword ? 'text' : 'password'}
                {...restTextFieldProps}
            />
        </span>
    );
}

Password.bspkName = 'Password';

export { Password };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
