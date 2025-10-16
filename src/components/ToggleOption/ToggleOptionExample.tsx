import { ToggleOptionProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<ToggleOptionProps>[] = [];

export const ToggleOptionExample: ComponentExample<ToggleOptionProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets,
    render: ({ props, Component }) => <Component {...props} />,
    sections: [],
    variants: {},
};
