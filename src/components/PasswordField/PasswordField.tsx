import { FormField, FormFieldWrapProps } from '-/components/FormField';
import { PasswordInputProps, PasswordInput } from '-/components/PasswordInput';

export type PasswordFieldProps = FormFieldWrapProps<PasswordInputProps>;

/**
 * A text input that allows users to enter text, numbers or symbols in a singular line.
 *
 * This component takes properties from the FormField and PasswordInput components.
 *
 * @example
 *     import { useState } from 'react';
 *     import { PasswordField } from '@bspk/ui/PasswordField';
 *
 *     export function Example() {
 *         const [value, setValue] = useState<string>('');
 *
 *         return (
 *             <PasswordField
 *                 controlId="Example controlId"
 *                 label="Example label"
 *                 name="Example name"
 *                 onChange={setValue}
 *                 value={value}
 *             />
 *         );
 *     }
 *
 * @name PasswordField
 * @phase UXReview
 */
export function PasswordField({
    controlId,
    errorMessage,
    helperText,
    invalid,
    label,
    labelTrailing,
    required,
    ...passwordInputProps
}: PasswordFieldProps) {
    return (
        <FormField
            controlId={controlId}
            data-bspk="password-field"
            errorMessage={errorMessage}
            helperText={helperText}
            invalid={invalid}
            label={label}
            labelTrailing={labelTrailing}
            required={required}
        >
            {(fieldProps) => (
                <PasswordInput
                    {...passwordInputProps}
                    {...fieldProps}
                    id={controlId}
                    invalid={invalid}
                    required={required}
                    value={passwordInputProps.value ?? ''}
                />
            )}
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
