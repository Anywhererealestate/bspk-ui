import { OTPInputProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<OTPInputProps>[] = [
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

export const OTPInputExample: ComponentExample<OTPInputProps> = {
    containerStyle: { width: '100%' },
    defaultState: {
        value: '',
        length: 6,
        name: 'OTP Input',
        alphanumeric: false,
    },
    disableProps: [],
    presets,
    render: ({ props, Component }) => <Component {...props} />,
    sections: [],
};
