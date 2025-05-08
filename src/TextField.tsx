import { FormField, FormFieldProps } from './FormField';
import { TextInput, TextInputProps } from './TextInput';

export type TextFieldProps = Pick<
    TextInputProps,
    | 'autoComplete'
    | 'disabled'
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
> &
    Pick<FormFieldProps, 'controlId' | 'errorMessage' | 'helperText' | 'label' | 'labelTrailing'>;

/**
 * A text input that allows users to enter text, numbers or symbols in a singular line.
 *
 * This component takes properties from the FormField and TextInput components.
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
    const errorMessage = (!inputProps.readOnly && !inputProps.disabled && errorMessageProp) || undefined;

    return (
        <FormField
            controlId={controlId}
            errorMessage={errorMessage}
            helperText={helperText}
            label={label}
            labelTrailing={labelTrailing}
            required={required}
        >
            {(fieldProps) => (
                <TextInput {...inputProps} {...fieldProps} aria-label={label} id={controlId} required={required} />
            )}
        </FormField>
    );
}

TextField.bspkName = 'TextField';

export { TextField };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
