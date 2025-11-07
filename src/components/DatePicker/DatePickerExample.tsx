import { DatePickerProps } from '.';
import { Field, FieldDescription, FieldError, FieldLabel } from '-/components/Field';
import { ComponentExample } from '-/utils/demo';

export const DatePickerExample: ComponentExample<DatePickerProps> = {
    scope: { Field, FieldLabel, FieldDescription, FieldError },
    defaultState: {
        value: new Date(1985, 5, 3),
        'aria-label': 'Select date',
    },
    disableProps: [],
    sections: [],
    variants: false,
};
