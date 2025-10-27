import { FormField, FormFieldControlProps } from '-/components/FormField';
import { Input, InputProps } from '-/components/Input';

export type InputFieldProps = FormFieldControlProps<InputProps>;

/**
 * A field wrapper for the Input component.
 *
 * This component takes properties from the FormField and Input components.
 *
 * @name InputField
 * @phase UXReview
 *
 * @generated
 */
export function InputField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    style,
    ...controlProps
}: InputFieldProps) {
    return (
        <FormField
            errorMessage={errorMessage}
            helperText={helperText}
            label={label}
            labelTrailing={labelTrailing}
            style={style}
        >
            <Input {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
