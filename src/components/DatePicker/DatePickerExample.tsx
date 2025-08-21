import { DatePickerProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const DatePickerExample: ComponentExample<DatePickerProps> = {
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
