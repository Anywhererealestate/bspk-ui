import { CalendarPickerProps } from '.';
import { ComponentExampleFn } from '-/utils/demo';

export const CalendarPickerExample: ComponentExampleFn<CalendarPickerProps> = ({ action }) => ({
    containerStyle: { width: '100%' },
    render: ({ props, Component }) => (
        <Component
            {...props}
            onChange={(next) => {
                action(`Date changed ${next.toLocaleString()}`);
            }}
        />
    ),
});
