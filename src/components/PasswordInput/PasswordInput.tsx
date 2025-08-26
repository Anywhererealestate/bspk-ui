import { useState } from 'react';
import './password-input.scss';
import { TextInput, TextInputProps } from '-/components/TextInput';

export type PasswordInputProps = Pick<
    TextInputProps,
    | 'aria-describedby'
    | 'aria-errormessage'
    | 'disabled'
    | 'invalid'
    | 'name'
    | 'onChange'
    | 'readOnly'
    | 'size'
    | 'value'
> & {
    ['aria-label']: string;
};

/**
 * An input field that is specifically built with a show/hide toggle for entering security passwords.
 *
 * @example
 *     import { PasswordInput } from '@bspk/ui/PasswordInput';
 *     import { useState } from 'react';
 *
 *     function Example() {
 *         const [value, setValue] = useState('');
 *
 *         return <PasswordInput value={value} onChange={setValue} aria-label="password" name="password" />;
 *     }
 *
 * @name PasswordInput
 * @phase Dev
 */
function PasswordInput({ disabled, readOnly, ...restTextInputProps }: PasswordInputProps) {
    const [isShowingPassword, setIsShowingPassword] = useState(false);

    const togglePasswordVisibility =
        disabled || readOnly
            ? undefined
            : () => {
                  setIsShowingPassword((prev) => !prev);
              };

    return (
        <span data-bspk="password-input">
            <TextInput
                disabled={disabled}
                readOnly={readOnly}
                showClearButton={false}
                trailing={
                    <button data-toggle-visibility-button onClick={togglePasswordVisibility}>
                        {isShowingPassword ? 'Hide' : 'Show'}
                    </button>
                }
                type={isShowingPassword ? 'text' : 'password'}
                {...restTextInputProps}
            />
        </span>
    );
}

PasswordInput.bspkName = 'PasswordInput';

export { PasswordInput };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
