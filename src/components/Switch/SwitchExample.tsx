import { SwitchProps } from '.';
import { ToggleOption } from '-/components/ToggleOption';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<SwitchProps>[] = [];

export const SwitchExample: ComponentExample<SwitchProps> = {
    //containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets,
    render: ({ props, Component }) => (
        <ToggleOption disabled={props.disabled} label="Enable feature" readOnly={props.readOnly}>
            <Component {...props} />
        </ToggleOption>
    ),
    sections: [],
    variants: {},
};
