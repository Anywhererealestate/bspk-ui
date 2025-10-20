import { InputPhone, InputPhoneProps } from './InputPhone';
import { FormField, FormFieldControlProps } from '-/components/Field';

export type InputPhoneFieldProps = FormFieldControlProps<InputPhoneProps>;

/**
 * /** A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and InputPhone component.
 *
 * @name InputPhoneField
 * @phase UXReview
 *
 * @export
 * 
 * @generated
 */
export function InputPhoneField({ label, helperText, labelTrailing, errorMessage, ...controlProps }: InputPhoneFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <InputPhone {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
