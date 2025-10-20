import { FormField, FormFieldControlProps } from '-/components/Field';
import { InputNumber, InputNumberProps } from '-/components/InputNumber';

export type InputNumberFieldProps = FormFieldControlProps<InputNumberProps>;

/**
 * A field wrapper for the InputNumber component.
 *
 * This component takes properties from the FormField and InputNumber components.
 *
 * @name InputNumberField
 * @phase UXReview
 *
 * @generated
 */
export function InputNumberField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    ...controlProps
}: InputNumberFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <InputNumber {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
