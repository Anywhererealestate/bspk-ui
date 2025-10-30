import { InputPhoneProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<InputPhoneProps>[] = [];

export const InputPhoneExample: ComponentExample<InputPhoneProps> = {
    defaultState: {
        'aria-label': 'input phone aria-label',
    },
    render: ({ props, Component }) => <Component {...props} />,
    variants: true,
};
