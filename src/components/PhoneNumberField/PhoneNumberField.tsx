import { FormField, FormFieldWrapProps } from '-/components/FormField';
import { PhoneNumberInput, PhoneNumberInputProps } from '-/components/PhoneNumberInput';

export type PhoneNumberFieldProps = FormFieldWrapProps<PhoneNumberInputProps>;

/**
 * A text input that allows users to enter text phone numbers with country codes.
 *
 * @example
 *     <PhoneNumberField label="Phone Number" initialCountryCode="US" value={value} onChange={onChange} />;
 *
 * @name PhoneNumberField
 * @phase UXReview
 */
export function PhoneNumberField({
    controlId,
    errorMessage,
    helperText,
    invalid,
    label,
    labelTrailing,
    required,
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
            {(fieldProps) => <PhoneNumberInput {...inputProps} {...fieldProps} aria-label={label} invalid={invalid} />}
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
