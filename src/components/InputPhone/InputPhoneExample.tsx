import { InputPhoneProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<InputPhoneProps>[] = [];

export const InputPhoneExample: ComponentExample<InputPhoneProps> = {
    render: ({ props, Component }) => <Component {...props} />,
    variants: true,
};
