import { TimePickerProps } from './TimePicker';
import { ComponentExample } from '-/utils/demo';

export const TimePickerExample: ComponentExample<TimePickerProps> = {
    variants: false,
    defaultState: {
        'aria-label': 'time picker aria-label',
    },
    render: ({ props, Component }) => <Component {...props} />,
};
