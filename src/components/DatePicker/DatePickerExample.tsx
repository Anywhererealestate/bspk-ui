import { DatePickerProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<DatePickerProps>[] = [];

export const DatePickerExample: ComponentExample<DatePickerProps> = {
    defaultState: {},
    disableProps: [],
    presets,
    render: ({ props, Component }) => {
        const { value, ...restProps } = props;

        return <Component {...restProps} value={value?.getDate ? value : undefined} />;
    },
    sections: [],
    variants: false,
};
