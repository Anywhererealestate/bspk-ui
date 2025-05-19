import { FormFieldProps, FormField } from './FormField';
import { NumberInputProps, NumberInput } from './NumberInput';

export type NumberFieldProps = Pick<
    NumberInputProps,
    'centered' | 'disabled' | 'id' | 'invalid' | 'name' | 'onChange' | 'readOnly' | 'size' | 'value'
> &
    Pick<FormFieldProps, 'controlId' | 'errorMessage' | 'helperText' | 'label' | 'labelTrailing' | 'required'>;

/**
 * A input element that allows users to either input a numerical value or singularly increase or decrease the values by
 * pressing the (+) or (-).
 *
 * This component takes properties from the FormField and NumberInput components.
 *
 * @name NumberField
 */
function NumberField({
    label,
    errorMessage: errorMessageProp,
    helperText,
    controlId,
    labelTrailing,
    required,
    ...inputProps
}: NumberFieldProps) {
    const errorMessage = (!inputProps.readOnly && !inputProps.disabled && errorMessageProp) || undefined;

    return (
        <FormField
            controlId={controlId}
            data-bspk="number-field"
            errorMessage={errorMessage}
            helperText={helperText}
            label={label}
            labelTrailing={labelTrailing}
            required={required}
        >
            {(fieldProps) => <NumberInput {...inputProps} {...fieldProps} aria-label={label} id={controlId} />}
        </FormField>
    );
}

NumberField.bspkName = 'NumberField';

export { NumberField };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
