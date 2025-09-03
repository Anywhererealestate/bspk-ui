import { CalendarInput, CalendarInputProps } from '-/components/CalendarInput';
import { FormField, FormFieldWrapProps } from '-/components/FormField';
import './calendar-field.scss';

export type CalendarFieldProps = FormFieldWrapProps<CalendarInputProps>;
/**
 * An input field that allows a customer to manually type in a specific date or triggers a date picker combobox to
 * select a date.
 *
 * @example
 *     import { CalendarField } from '@bspk/ui/CalendarField';
 *     import { useState } from 'react';
 *
 *     function Example() {
 *         const [date, setDate] = useState<Date | undefined>(new Date());
 *
 *         return (
 *             <CalendarField
 *                 name="calendar input"
 *                 aria-label="calendar input"
 *                 label="calendar input"
 *                 value={date}
 *                 onChange={setDate}
 *                 controlId="Example controlId"
 *             />
 *         );
 *     }
 *
 * @name CalendarField
 * @phase Dev
 */
export function CalendarField({
    label,
    errorMessage,
    helperText,
    invalid,
    labelTrailing,
    required,
    controlId,
    ...inputProps
}: CalendarFieldProps) {
    return (
        <FormField
            controlId={controlId}
            data-bspk="calendar-field"
            errorMessage={errorMessage}
            helperText={helperText}
            invalid={invalid}
            label={label}
            labelTrailing={labelTrailing}
            required={required}
        >
            {(fieldProps) => <CalendarInput {...inputProps} {...fieldProps} aria-label={label} invalid={invalid} />}
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
