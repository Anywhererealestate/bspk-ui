import { FormFieldProps, FormField } from '-/components/FormField';
import { TextInputProps, TextInput } from '-/components/TextInput';

export type TextFieldProps = Omit<FormFieldProps, 'children'> &
    Pick<
        TextInputProps,
        | 'autoComplete'
        | 'disabled'
        | 'errorMessage'
        | 'inputRef'
        | 'invalid'
        | 'leading'
        | 'name'
        | 'onChange'
        | 'placeholder'
        | 'readOnly'
        | 'required'
        | 'size'
        | 'trailing'
        | 'type'
        | 'value'
    >;

/**
 * A text input that allows users to enter text, numbers or symbols in a singular line.
 *
 * This component takes properties from the FormField and TextInput components.
 *
 * @example
 *     import { useState } from 'react';
 *     import { TextField } from '@bspk/ui/TextField';
 *
 *     export function Example() {
 *         const [value, setValue] = useState<string>('');
 *
 *         return (
 *             <TextField
 *                 controlId="Example controlId"
 *                 label="Example label"
 *                 name="Example name"
 *                 onChange={setValue}
 *                 value={value}
 *             />
 *         );
 *     }
 *
 * @name TextField
 * @phase UXReview
 */
function TextField({
    label,
    errorMessage,
    helperText,
    controlId,
    labelTrailing,
    required,
    invalid,
    ...inputProps
}: TextFieldProps) {
    return (
        <FormField
            controlId={controlId}
            data-bspk="text-field"
            errorMessage={errorMessage}
            helperText={helperText}
            invalid={invalid}
            label={label}
            labelTrailing={labelTrailing}
            required={required}
        >
            {(fieldProps) => (
                <TextInput
                    {...inputProps}
                    {...fieldProps}
                    aria-label={label}
                    errorMessage={errorMessage}
                    id={controlId}
                    invalid={invalid}
                    required={required}
                    value={inputProps.value ?? ''}
                />
            )}
        </FormField>
    );
}

TextField.bspkName = 'TextField';

export { TextField };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
