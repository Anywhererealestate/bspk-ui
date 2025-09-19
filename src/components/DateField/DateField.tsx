import './date-field.scss';
import { DateInput, DateInputProps } from '-/components/DateInput';
import { FormField, FormFieldWrapProps } from '-/components/FormField';

export type DateFieldProps = FormFieldWrapProps<DateInputProps>;
/**
 * An input field that allows a customer to manually type in a specific date or triggers a date picker combobox to
 * select a date.
 *
 * @example
 *     import { DateField } from '@bspk/ui/DateField';
 *     import { useState } from 'react';
 *
 *     function Example() {
 *         const [date, setDate] = useState<Date | undefined>(new Date());
 *
 *         return (
 *             <DateField
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
 * @name DateField
 * @phase Dev
 */
export function DateField({
    label,
    errorMessage,
    helperText,
    invalid,
    labelTrailing,
    required,
    controlId,
    ...inputProps
}: DateFieldProps) {
    return (
        <FormField
            controlId={controlId}
            data-bspk="date-field"
            errorMessage={errorMessage}
            helperText={helperText}
            invalid={invalid}
            label={label}
            labelTrailing={labelTrailing}
            required={required}
        >
            {(fieldProps) => <DateInput {...inputProps} {...fieldProps} aria-label={label} invalid={invalid} />}
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
