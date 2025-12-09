import { useState } from 'react';
import { DatePicker, DatePickerProps } from '.';
import { Field, FieldLabel, FieldDescription } from '-/components/Field';
import { ComponentExample } from '-/utils/demo';

export const DatePickerExample: ComponentExample<DatePickerProps> = {
    containerStyle: { width: 320, padding: 0 },
    defaultState: {
        value: '06/03/1985',
        'aria-label': 'Select date',
    },
    disableProps: [],

    variants: false,
};

export const Usage = () => {
    const [fieldDate, setFieldDate] = useState<string>();

    return (
        <div style={{ width: 320 }}>
            <Field>
                <FieldLabel>Date</FieldLabel>
                <DatePicker name="date1" onChange={setFieldDate} required value={fieldDate} />
                <FieldDescription>The date picker allows you to select a date.</FieldDescription>
            </Field>
        </div>
    );
};
