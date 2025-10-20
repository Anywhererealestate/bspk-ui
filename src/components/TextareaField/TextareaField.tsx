import { FormField, FormFieldControlProps } from '-/components/Field';
import { Textarea, TextareaProps } from '-/components/Textarea';

export type TextareaFieldProps = FormFieldControlProps<TextareaProps>;

/**
 * A field wrapper for the Textarea component.
 *
 * This component takes properties from the FormField and Textarea components.
 *
 * @name TextareaField
 * @phase UXReview
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
