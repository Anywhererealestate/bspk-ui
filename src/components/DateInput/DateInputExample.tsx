import { DateInputProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<DateInputProps>[] = [];

export const DateInputExample: ComponentExample<DateInputProps> = {
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
