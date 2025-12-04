import { FormField, FormFieldControlProps } from '-/components/FormField';
import { InputNumber, InputNumberProps } from '-/components/InputNumber';

export type InputNumberFieldProps = FormFieldControlProps<InputNumberProps>;

/**
 * A field wrapper for the InputNumber component.
 *
 * This component takes properties from the FormField and InputNumber components.
 *
 * @name InputNumberField
 * @phase Stable
 *
 * @generated
 */
export function InputNumberField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    style,
    ...controlProps
}: InputNumberFieldProps) {
    return (
        <FormField
            errorMessage={errorMessage}
            helperText={helperText}
            label={label}
            labelTrailing={labelTrailing}
            style={style}
        >
            <InputNumber {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
