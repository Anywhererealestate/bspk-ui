import './password-input.scss';
import { useState } from 'react';
import { Button } from '-/components/Button';
import { useFieldContext } from '-/components/Field';
import { Input, InputProps } from '-/components/Input';

export type PasswordInputProps = Pick<
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
 * @phase UXReview
 */
export function PasswordInput({
    disabled,
    readOnly,
    size = 'medium',
    inputProps,
    inputRef,
    name,
    onChange,
    required,
    value,
    containerRef,
    id: idProp,
    invalid: invalidProp,
    ...props
}: PasswordInputProps) {
    const { id, ariaDescribedBy, ariaErrorMessage, hasError } = useFieldContext(idProp);
    const invalid = !readOnly && !disabled && (invalidProp || hasError);

    const [isShowingPassword, setIsShowingPassword] = useState(false);

    const togglePasswordVisibility = () => {
        if (disabled || readOnly) return;
        setIsShowingPassword((prev) => !prev);
    };

    return (
        <div {...props} data-bspk="password-input">
            <Input
                aria-describedby={ariaDescribedBy}
                aria-errormessage={ariaErrorMessage}
                autoComplete="off"
                containerRef={containerRef}
                disabled={disabled}
                id={id}
                inputProps={inputProps}
                inputRef={inputRef}
                invalid={invalid}
                leading={
                    !isShowingPassword && (
                        <>
                            {Array.from({ length: value?.length || 0 }, (_, i) => (
                                <span key={i} />
                            ))}
                        </>
                    )
                }
                name={name}
                onChange={onChange}
                onClick={(e) => {
                    (e.currentTarget as HTMLElement)?.querySelector('input')?.focus();
                }}
                owner="password-input"
                readOnly={readOnly}
                required={required}
                showClearButton={false}
                size={size}
                trailing={
                    !disabled &&
                    !readOnly && (
                        <Button
                            label={isShowingPassword ? 'Hide' : 'Show'}
                            onClick={togglePasswordVisibility}
                            variant="tertiary"
                        />
                    )
                }
                type={isShowingPassword ? 'text' : 'password'}
                value={value}
            />
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
