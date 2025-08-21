import { YearPickerProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const YearPickerExample: ComponentExample<YearPickerProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets: [],
    render: ({ props, Component }) => <Component {...props} />,
    sections: [],
    variants: {},
};
