import { FormField, FormFieldControlProps } from '-/components/FormField';
import { InputPhone, InputPhoneProps } from '-/components/InputPhone';

export type InputPhoneFieldProps = FormFieldControlProps<InputPhoneProps>;

/**
 * A field wrapper for the InputPhone component.
 *
 * This component takes properties from the FormField and InputPhone components.
 *
 * @name InputPhoneField
 * @phase UXReview
 *
 * @generated
 */
export function InputPhoneField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    ...controlProps
}: InputPhoneFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <InputPhone {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
