import { FormFieldProps, FormField } from './FormField';
import { TextInputProps, TextInput } from './TextInput';

import { InvalidPropsLibrary } from '.';

export type TextFieldProps = InvalidPropsLibrary &
    Pick<
        TextInputProps,
        | 'autoComplete'
        | 'disabled'
        | 'inputRef'
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
    > &
    Pick<
        FormFieldProps,
        'controlId' | 'errorMessage' | 'helperText' | 'label' | 'labelTrailing'
    >;

/**
 * A text input that allows users to enter text, numbers or symbols in a
 * singular line.
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
 */
function TextField({
    label,
    errorMessage: errorMessageProp,
    helperText,
    controlId,
    labelTrailing,
    required,
    ...inputProps
}: TextFieldProps) {
    const errorMessage =
        (!inputProps.readOnly && !inputProps.disabled && errorMessageProp) ||
        undefined;

    return (
        <FormField
            controlId={controlId}
            data-bspk="text-field"
            errorMessage={errorMessage}
            helperText={helperText}
            label={label}
            labelTrailing={labelTrailing}
            required={required}
        >
            {(fieldProps) => (
                <TextInput
                    {...inputProps}
                    {...fieldProps}
                    aria-label={label}
                    id={controlId}
                    required={required}
                />
            )}
        </FormField>
    );
}

TextField.bspkName = 'TextField';

export { TextField };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
