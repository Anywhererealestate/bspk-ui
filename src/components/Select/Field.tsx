import { Select, SelectProps } from './Select';
import { FormField, FormFieldControlProps } from '-/components/Field';

export type SelectFieldProps = FormFieldControlProps<SelectProps>;

/**
 * /** A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and Select component.
 *
 * @name SelectField
 * @phase UXReview
 *
 * @export
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
