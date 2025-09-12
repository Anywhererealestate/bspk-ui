import { OTPInputProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const presets = [
    {
        label: '4 Characters',
        propState: {
            value: '',
            length: 4,
            name: 'OTP Input',
            label: 'Example label',
        },
    },
    {
        label: '6 Characters',
        propState: {
            value: '',
            length: 6,
            name: 'OTP Input',
            label: 'Example label',
        },
    },
];

export const OTPInputExample: ComponentExample<OTPInputProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets,
    render: ({ props, Component }) => <Component {...props} />,
    sections: [],
};
