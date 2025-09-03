import { CalendarFieldProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const CalendarFieldExample: ComponentExample<CalendarFieldProps> = {
    defaultState: {},
    disableProps: [],
    presets: [],
    render: ({ props, Component }) => <Component {...props} value={props.value?.getDate ? props.value : undefined} />,
    sections: [],
    variants: {},
};
