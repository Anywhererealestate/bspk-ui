import { Textarea, TextareaProps } from './Textarea';
import { FormField, FormFieldControlProps } from '-/components/Field';

export type TextareaFieldProps = FormFieldControlProps<TextareaProps>;

/**
 * /** A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and Textarea component.
 *
 * @name TextareaField
 * @phase UXReview
 *
 * @export
 * 
 * @generated
 */
export function TextareaField({ label, helperText, labelTrailing, errorMessage, ...controlProps }: TextareaFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <Textarea {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
