import { DateFieldProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<DateFieldProps>[] = [];

export const DateFieldExample: ComponentExample<DateFieldProps> = {
    defaultState: {},
    disableProps: [],
    presets,
    render: ({ props, Component }) => <Component {...props} value={props.value?.getDate ? props.value : undefined} />,
    sections: [],
    variants: {},
};
