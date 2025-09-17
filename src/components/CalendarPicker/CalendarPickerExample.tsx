import { isValid } from 'date-fns';
import { CalendarPickerProps } from '.';
import { ComponentExampleFn } from '-/utils/demo';

export const CalendarPickerExample: ComponentExampleFn<CalendarPickerProps> = ({ action }) => ({
    defaultState: {
        value: new Date(),
    },
    containerStyle: { width: '100%' },
    render: ({ props, Component }) => {
        const value = isValid(props.value) ? props.value : new Date();
        return (
            <Component
                {...props}
                onChange={(next) => {
                    props.onChange?.(next);
                    action(`value updated to ${next.toDateString()}`);
                }}
                value={value}
            />
        );
    },
    variants: false,
});
