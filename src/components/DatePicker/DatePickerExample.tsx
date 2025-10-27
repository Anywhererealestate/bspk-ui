import { DatePickerProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const DatePickerExample: ComponentExample<DatePickerProps> = {
    defaultState: {
        value: new Date(1985, 5, 3),
        'aria-label': 'Select date',
    },
    disableProps: [],
    variants: false,
};
