import { Input, InputProps } from './Input';
import { FormField, FormFieldControlProps } from '-/components/Field';

export type InputFieldProps = FormFieldControlProps<InputProps>;

/**
 * /** A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and Input component.
 *
 * @name InputField
 * @phase UXReview
 *
 * @export
 * 
 * @generated
 */
export function InputField({ label, helperText, labelTrailing, errorMessage, ...controlProps }: InputFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <Input {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
