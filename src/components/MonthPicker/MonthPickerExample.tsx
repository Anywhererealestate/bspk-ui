import { MonthPickerProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const MonthPickerExample: ComponentExample<MonthPickerProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets: [],
    render: ({ props, Component }) => <Component {...props} />,
    sections: [],
    variants: {},
};
