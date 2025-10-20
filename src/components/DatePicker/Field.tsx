import { DatePicker, DatePickerProps } from './DatePicker';
import { FormField, FormFieldControlProps } from '-/components/Field';

export type DatePickerFieldProps = FormFieldControlProps<DatePickerProps>;

/**
 * /** A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and DatePicker component.
 *
 * @name DatePickerField
 * @phase UXReview
 *
 * @export
 * 
 * @generated
 */
export function DatePickerField({ label, helperText, labelTrailing, errorMessage, ...controlProps }: DatePickerFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <DatePicker {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
