import { OTPInputProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<OTPInputProps>[] = [
    {
        label: '4 Characters',
        propState: {
            defaultValue: '',
            length: 4,
            name: 'OTP Input',
        },
    },
    {
        label: '6 Characters',
        propState: {
            defaultValue: '',
            length: 6,
            name: 'OTP Input',
        },
    },
];

export const OTPInputExample: ComponentExample<OTPInputProps> = {
    defaultState: {
        defaultValue: '',
        length: 6,
        name: 'OTP Input',
        alphanumeric: false,
    },
    disableProps: [],
    presets,
    render: ({ props, Component }) => <Component {...props} />,
    sections: [],
};
