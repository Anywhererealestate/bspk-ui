import { OTPInputProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const OTPInputExample: ComponentExample<OTPInputProps> = {
    containerStyle: { width: '100%' },
    defaultState: {},
    disableProps: [],
    presets: [
        {
            label: '4 Characters',
            propState: {
                value: '',
                length: 4,
            },
        },
        {
            label: '6 Characters',
            propState: {
                value: '',
                length: 6,
            },
        },
    ],
    render: ({ props, Component }) => <Component {...props} />,
    sections: [],
};
