import { FormField, FormFieldProps } from '-/components/FormField';
import { PhoneNumberInput, PhoneNumberInputProps } from '-/components/PhoneNumberInput';

export type PhoneNumberFieldProps = Omit<FormFieldProps, 'children'> &
    Pick<
        PhoneNumberInputProps,
        | 'autoComplete'
        | 'disabled'
        | 'disableFormatting'
        | 'errorMessage'
        | 'initialCountryCode'
        | 'inputRef'
        | 'invalid'
        | 'name'
        | 'onChange'
        | 'placeholder'
        | 'readOnly'
        | 'required'
        | 'size'
        | 'type'
        | 'value'
    >;

/**
 * A text input that allows users to enter text phone numbers with country codes.
 *
 * @example
 *     <PhoneNumberField label="Phone Number" initialCountryCode="US" value={value} onChange={onChange} />;
 *
 * @name PhoneNumberField
 * @phase QA
 */
function PhoneNumberField({
    label,
    errorMessage,
    helperText,
    controlId,
    labelTrailing,
    required,
    invalid,
    ...inputProps
}: PhoneNumberFieldProps) {
    return (
        <FormField
            controlId={controlId}
            data-bspk="phone-number-field"
            errorMessage={errorMessage}
            helperText={helperText}
            invalid={invalid}
            label={label}
            labelTrailing={labelTrailing}
            required={required}
        >
            {(fieldProps) => (
                <PhoneNumberInput
                    {...inputProps}
                    {...fieldProps}
                    aria-label={label}
                    errorMessage={errorMessage}
                    invalid={invalid}
                />
            )}
        </FormField>
    );
}

PhoneNumberField.bspkName = 'PhoneNumberField';

export { PhoneNumberField };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
