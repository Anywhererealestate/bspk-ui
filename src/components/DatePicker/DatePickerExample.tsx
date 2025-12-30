import { useState } from 'react';
import { DatePicker, DatePickerProps } from '.';
import { Field } from '-/components/Field';
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
            <Field controlId="date1" helperText="The date picker allows you to select a date." label="Date">
                <DatePicker id="date1" name="date1" onChange={setFieldDate} required value={fieldDate} />
            </Field>
        </div>
    );
};
