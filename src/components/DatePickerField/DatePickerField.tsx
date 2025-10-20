import { FormField, FormFieldControlProps } from '-/components/Field';
import { DatePicker, DatePickerProps } from '-/components/DatePicker';

export type DatePickerFieldProps = FormFieldControlProps<DatePickerProps>;

/**
 * A field wrapper for the DatePicker component.
 *
 * This component takes properties from the FormField and DatePicker components.
 *
 * @name DatePickerField
 * @phase UXReview
 *
 * @generated
 */
export function DatePickerField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    ...controlProps
}: DatePickerFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <DatePicker {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
