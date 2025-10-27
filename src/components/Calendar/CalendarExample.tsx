import { CalendarProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<CalendarProps>[] = [
    {
        label: 'With selected date',
        propState: {
            value: new Date(2024, 5, 10),
        },
    },
    {
        label: 'No selected date',
        propState: {
            value: undefined,
        },
    },
];

export const CalendarExample: ComponentExample<CalendarProps> = {
    containerStyle: { width: '100%' },
    defaultState: {
        value: undefined,
    },
    disableProps: ['focusTrap'],
    presets,
    render: ({ props, Component }) => <Component {...props} />,
    variants: {
        focusTrap: false,
    },
};
