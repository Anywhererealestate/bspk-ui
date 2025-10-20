import { TimePicker, TimePickerProps } from './TimePicker';
import { FormField, FormFieldControlProps } from '-/components/Field';

export type TimePickerFieldProps = FormFieldControlProps<TimePickerProps>;

/**
 * /** A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and TimePicker component.
 *
 * @name TimePickerField
 * @phase UXReview
 *
 * @export
 * 
 * @generated
 */
export function TimePickerField({ label, helperText, labelTrailing, errorMessage, ...controlProps }: TimePickerFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <TimePicker {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
