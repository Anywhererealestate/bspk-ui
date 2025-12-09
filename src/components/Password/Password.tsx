import './password.scss';
import { useState } from 'react';
import { Button } from '-/components/Button';
import { useFieldInit } from '-/components/Field';
import { InputElement, InputProps } from '-/components/Input';
import { FieldControlProps } from '-/types/common';

export type PasswordProps = FieldControlProps & Pick<InputProps, 'containerRef' | 'inputProps' | 'inputRef' | 'size'>;

/**
 * An input field that is specifically built with a show/hide toggle for entering security passwords.
 *
 * For a more complete example with field usage, see the PasswordField component.
 *
 * @example
 *     import { Password } from '@bspk/ui/Password';
 *     import { Field, FieldLabel, FieldDescription } from '-/components/Field';
 *
 *     () => {
 *         const [value, setValue] = useState<string | undefined>('');
 *
 *         return (
 *             <div style={{ width: 320 }}>
 *                 <Field>
 *                     <FieldLabel>Password</FieldLabel>
 *                     <Password
 *                         aria-label="password"
 *                         name="password"
 *                         onChange={(next) => setValue(next)}
 *                         value={value}
 *                     />
 *                     <FieldDescription>The password field allows you to enter a secure password.</FieldDescription>
 *                 </Field>
 *             </div>
 *         );
 *     };
 *
 * @name Password
 * @phase Stable
 */
export function Password({
    inputProps,
    inputRef,
    name,
    onChange,
    required = false,
    containerRef,
    invalid: invalidProp,
    readOnly,
    disabled,
    id: idProp,
    'aria-label': ariaLabel,
    ...props
}: PasswordProps) {
    const { id, ariaDescribedBy, ariaErrorMessage, invalid } = useFieldInit({
        idProp,
        required,
        disabled,
        readOnly,
        invalidProp,
    });

    const [isShowingPassword, setIsShowingPassword] = useState(false);

    const togglePasswordVisibility = () => {
        if (disabled || readOnly) return;
        setIsShowingPassword((prev) => !prev);
    };

    return (
        <InputElement
            {...props}
            aria-describedby={ariaDescribedBy}
            aria-errormessage={ariaErrorMessage}
            aria-label={ariaLabel || undefined}
            autoComplete="off"
            containerRef={containerRef}
            data-bspk-owner="password"
            id={id}
            inputProps={inputProps}
            inputRef={inputRef}
            invalid={invalid}
            name={name}
            onChange={onChange}
            onClick={(e) => {
                (e.currentTarget as HTMLElement)?.querySelector('input')?.focus();
            }}
            owner="password"
            required={required}
            showClearButton={false}
            trailing={
                !disabled &&
                !readOnly && (
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
