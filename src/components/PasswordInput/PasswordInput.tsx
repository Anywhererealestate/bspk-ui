import { useState } from 'react';
import './password-input.scss';
import { Button, ButtonProps } from '-/components/Button';
import { TextInput, TextInputProps } from '-/components/TextInput';

const BUTTON_SIZE_MAP: Record<Exclude<TextInputProps['size'], undefined>, ButtonProps['size']> = {
    small: 'small',
    medium: 'medium',
    large: 'large',
};

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
function PasswordInput({ disabled, readOnly, value, size = 'medium', ...restTextInputProps }: PasswordInputProps) {
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
                leading={
                    !isShowingPassword && (
                        <span data-password>
                            {Array.from({ length: value?.length || 0 }, (_, i) => (
                                <span key={i}>o</span>
                            ))}
                        </span>
                    )
                }
                onClick={(e) => {
                    e.currentTarget.querySelector('input')?.focus();
                }}
                readOnly={readOnly}
                showClearButton={false}
                trailing={
                    <Button
                        label={isShowingPassword ? 'Hide' : 'Show'}
                        onClick={togglePasswordVisibility}
                        size={BUTTON_SIZE_MAP[size]}
                        variant="tertiary"
                    />
                }
                type={isShowingPassword ? 'text' : 'password'}
                {...restTextInputProps}
                size={size}
                value={value}
            />
        </span>
    );
}

PasswordInput.bspkName = 'PasswordInput';

export { PasswordInput };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
