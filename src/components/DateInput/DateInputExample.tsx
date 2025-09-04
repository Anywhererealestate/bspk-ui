import { DateInputProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const DateInputExample: ComponentExample<DateInputProps> = {
    defaultState: {},
    disableProps: [],
    presets: [],
    render: ({ props, Component }) => {
        const { value, ...restProps } = props;

        return <Component {...restProps} value={value?.getDate ? value : undefined} />;
    },
    sections: [],
    variants: false,
};
