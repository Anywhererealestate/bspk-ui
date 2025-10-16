import { TimePickerProps } from './TimePicker';
import { Field, FieldDescription, FieldLabel } from '-/components/Field';
import { ComponentExample } from '-/utils/demo';

export const TimePickerExample: ComponentExample<TimePickerProps> = {
    variants: false,

    render: ({ props, Component }) => (
        <Field>
            <FieldLabel>Time</FieldLabel>
            <Component {...props} />
            <FieldDescription>The time picker allows you to select a time.</FieldDescription>
        </Field>
    ),
};
