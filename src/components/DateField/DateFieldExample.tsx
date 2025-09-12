import { DateFieldProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const presets = [];

export const DateFieldExample: ComponentExample<DateFieldProps> = {
    defaultState: {},
    disableProps: [],
    presets,
    render: ({ props, Component }) => <Component {...props} value={props.value?.getDate ? props.value : undefined} />,
    sections: [],
    variants: {},
};
