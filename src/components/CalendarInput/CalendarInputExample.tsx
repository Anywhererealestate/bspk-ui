import { CalendarInputProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const CalendarInputExample: ComponentExample<CalendarInputProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets: [],
    render: ({ props, Component }) => {
        const { value, ...restProps } = props;

        return <Component {...restProps} value={value?.getDate ? value : undefined} />;
    },
    sections: [],
    variants: {},
};
