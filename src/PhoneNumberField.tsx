import { FormField, FormFieldProps } from './FormField';
import { PhoneNumberInput, PhoneNumberInputProps } from './PhoneNumberInput';
import { TextInputProps } from './TextInput';

import { InvalidPropsLibrary } from 'src';

export type PhoneNumberFieldProps = InvalidPropsLibrary &
    Pick<
        TextInputProps,
        | 'autoComplete'
        | 'disabled'
        | 'inputRef'
        | 'invalid'
        | 'name'
        | 'placeholder'
        | 'readOnly'
        | 'required'
        | 'size'
        | 'type'
        | 'value'
    > &
    Pick<FormFieldProps, 'controlId' | 'errorMessage' | 'helperText' | 'label' | 'labelTrailing'> &
    Pick<PhoneNumberInputProps, 'disableFormatting' | 'initialCountryCode' | 'inputRef' | 'onChange'>;

/**
 * A text input that allows users to enter text phone numbers with country codes.
 *
 * @example
 *     <PhoneNumberField label="Phone Number" initialCountryCode="US" value={value} onChange={onChange} />;
 *
 * @name PhoneNumberField
 * @phase WorkInProgress
 */
function PhoneNumberField({
    label,
    errorMessage: errorMessageProp,
    helperText,
    controlId,
    labelTrailing,
    required,
    value,
    onChange,
    disableFormatting,
    initialCountryCode,
    invalid,
    ...inputProps
}: PhoneNumberFieldProps) {
    const errorMessage = (!inputProps.readOnly && !inputProps.disabled && errorMessageProp) || undefined;

    return (
        <FormField
            controlId={controlId}
            data-bspk="phone-number-field"
            errorMessage={errorMessage}
            helperText={helperText}
            invalid={!inputProps.readOnly && !inputProps.disabled && invalid}
            label={label}
            labelTrailing={labelTrailing}
            required={required}
        >
            {(fieldProps) => (
                <PhoneNumberInput
                    aria-label={label}
                    disableFormatting={disableFormatting}
                    errorMessage={errorMessage}
                    initialCountryCode={initialCountryCode}
                    onChange={onChange}
                    value={value}
                    {...fieldProps}
                    {...inputProps}
                />
            )}
        </FormField>
    );
}

PhoneNumberField.bspkName = 'PhoneNumberField';

export { PhoneNumberField };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
