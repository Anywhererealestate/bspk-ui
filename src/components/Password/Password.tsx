import './password.scss';
import { useState } from 'react';
import { Button } from '-/components/Button';
import { useFieldInit } from '-/components/Field';
import { InputElement, InputProps } from '-/components/Input';
import { useId } from '-/hooks/useId';

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
 * For a more complete example with field usage, see the PasswordField component.
 *
 * @example
 *     import { Password } from '@bspk/ui/Password';
 *     import { useState } from 'react';
 *
 *     function ExampleStandalone() {
 *         const [value, setValue] = useState('');
 *
 *         return (
 *             <Password
 *                 aria-label="Enter password"
 *                 value={value}
 *                 onChange={setValue}
 *                 aria-label="password"
 *                 name="password"
 *             />
 *         );
 *     }
 *
 *     function ExampleWithField() {
 *         const [value, setValue] = useState('');
 *         return (
 *             <Field>
 *                 <FieldLabel>Password</FieldLabel>
 *                 <Password value={value} onChange={setValue} aria-label="password" name="password" />
 *                 <FieldDescription>The password field allows you to enter a secure password.</FieldDescription>
 *             </Field>
 *         );
 *     }
 *
 * @name Password
 * @phase UXReview
 */
export function Password({
    inputProps,
    inputRef,
    name,
    onChange,
    required,
    containerRef,
    invalid: invalidProp,
    readOnly,
    disabled,
    id: idProp,
    ...props
}: PasswordProps) {
    const id = useId(idProp);
    const { ariaDescribedBy, ariaErrorMessage } = useFieldInit({ required });
    const invalid = !disabled && !readOnly && (invalidProp || !!ariaErrorMessage);

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
