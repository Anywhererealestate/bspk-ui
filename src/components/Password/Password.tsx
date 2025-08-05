import { useState } from 'react';
import { TextField, TextFieldProps } from '-/components/TextField';
import './password.scss';

export type PasswordProps = Pick<
    TextFieldProps,
    'disabled' | 'invalid' | 'label' | 'name' | 'onChange' | 'readOnly' | 'size' | 'value'
>;

/**
 * Component description.
 *
 * @example
 *     import { Password } from '@bspk/ui/Password';
 *
 *     function Example() {
 *         return <Password>Example Password</Password>;
 *     }
 *
 * @name Password
 * @phase Dev
 */
function Password({ disabled, readOnly, ...restTextFieldProps }: PasswordProps) {
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
                controlId="Example controlId"
                disabled={disabled}
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
