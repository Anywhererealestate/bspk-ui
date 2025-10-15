import { InputOTPProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<InputOTPProps>[] = [
    {
        label: '4 Characters',
        propState: {
            value: '',
            length: 4,
            name: 'OTP Input',
        },
    },
    {
        label: '6 Characters',
        propState: {
            value: '',
            length: 6,
            name: 'OTP Input',
        },
    },
];

export const InputOTPExample: ComponentExample<InputOTPProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets,
    render: ({ props, Component }) => <Component {...props} />,
    sections: [],
};
