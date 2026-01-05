import { useState } from 'react';
import { TimePicker, TimePickerProps } from './TimePicker';
import { Field } from '-/components/Field';
import { ComponentExample } from '-/utils/demo';

export const TimePickerExample: ComponentExample<TimePickerProps> = {
    variants: false,
    defaultState: {
        'aria-label': 'time picker aria-label',
    },
    render: ({ props, Component }) => <Component {...props} />,
    containerStyle: { width: 320, padding: 0 },
};

export const Usage = () => {
    const [value, onChange] = useState<string | undefined>('');

    return (
        <div style={{ width: 320 }}>
            <Field controlId="destination-time" helperText="The time picker allows you to select a time." label="Time">
                <TimePicker id="destination-time" name="time" onChange={onChange} value={value} />
            </Field>
        </div>
    );
};
