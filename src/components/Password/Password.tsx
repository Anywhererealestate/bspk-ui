import './password.scss';
import { useState } from 'react';
import { Button } from '-/components/Button';
import { Input, InputProps } from '-/components/Input';

export type PasswordProps = Pick<
    InputProps,
    | 'containerRef'
    | 'disabled'
    | 'id'
    | 'inputProps'
    | 'inputRef'
    | 'invalid'
    | 'name'
    | 'onChange'
    | 'readOnly'
    | 'required'
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
 *         return <Password value={value} onChange={setValue} aria-label="password" name="password" />;
 *     }
 *
 * @name Password
 * @phase UXReview
 */
export function Password({ inputProps, inputRef, name, onChange, required, containerRef, ...props }: PasswordProps) {
    const [isShowingPassword, setIsShowingPassword] = useState(false);

    const togglePasswordVisibility = () => {
        if (props.disabled || props.readOnly) return;
        setIsShowingPassword((prev) => !prev);
    };

    return (
        <Input
            {...props}
            autoComplete="off"
            containerRef={containerRef}
            inputProps={inputProps}
            inputRef={inputRef}
            name={name}
            onChange={onChange}
            onClick={(e) => {
                (e.currentTarget as HTMLElement)?.querySelector('input')?.focus();
            }}
            owner="password"
            required={required}
            showClearButton={false}
            trailing={
                !props.disabled &&
                !props.readOnly && (
                    <Button
                        data-toggle-visibility-button
                        label={isShowingPassword ? 'Hide' : 'Show'}
                        onClick={togglePasswordVisibility}
                        variant="tertiary"
                    />
                )
            }
            type={isShowingPassword ? 'text' : 'password'}
        />
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
