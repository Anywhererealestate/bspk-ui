import { ChipInputProps } from '.';
import { ComponentExampleFn } from '-/utils/demo';


export const ChipInputExample: ComponentExampleFn<ChipInputProps> = ({ action }) => ({
    containerStyle: { width: '100%' },
    render: ({ props, Component }) => {
        return <Component {...props} onClick={() => action('ChipInput clicked!')} />;
    },
    presets: [
        {
            label: 'Basic ChipInput',
            propState: {
                label: 'chip option',
            },
        },
        {
            label: 'with leadingIcon',
            propState: {
                label: 'chip option',
                leadingIcon: 'SignLanguage',
            },
        },
        {
            label: 'with removable = false',
            propState: {
                label: 'chip option',
                removable: false,
            },
        },
        {
            label: 'with removable = false and leadingIcon',
            propState: {
                label: 'chip option',
                leadingIcon: 'SignLanguage',
                removable: false,
            },
        },
        {
            label: 'disabled',
            propState: {
                label: 'chip option',
                leadingIcon: 'SignLanguage',
                disabled: true,
            },
        },
    ],
});
