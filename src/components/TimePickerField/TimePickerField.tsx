import { FormField, FormFieldControlProps } from '-/components/Field';
import { TimePicker, TimePickerProps } from '-/components/TimePicker';

export type TimePickerFieldProps = FormFieldControlProps<TimePickerProps>;

/**
 * A field wrapper for the TimePicker component.
 *
 * This component takes properties from the FormField and TimePicker components.
 *
 * @name TimePickerField
 * @phase UXReview
 *
 * @generated
 */
export function TimePickerField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    ...controlProps
}: TimePickerFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <TimePicker {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
