import { FormField, FormFieldControlProps } from '-/components/FormField';
import { Select, SelectProps } from '-/components/Select';

export type SelectFieldProps = FormFieldControlProps<SelectProps>;

/**
 * A field wrapper for the Select component.
 *
 * This component takes properties from the FormField and Select components.
 *
 * @name SelectField
 * @phase UXReview
 *
 * @generated
 */
export function SelectField({ label, helperText, labelTrailing, errorMessage, ...controlProps }: SelectFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <Select {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
