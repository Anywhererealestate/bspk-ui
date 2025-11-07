import { BottomNavigationProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<BottomNavigationProps>[] = [
    {
        label: 'Three options',
        propState: {
            options: [
                {
                    value: '1',
                    label: 'Item 1',
                    icon: 'Settings',
                    iconSelected: 'SettingsFill',
                },
                {
                    value: '2',
                    label: 'Item 2',
                    icon: 'Cloud',
                    iconSelected: 'CloudFill',
                },
                {
                    value: '3',
                    label: 'Item 3',
                    icon: 'Smartphone',
                    iconSelected: 'SmartphoneFill',
                },
            ],
            value: '1',
            label: 'Single Icon',
        },
    },
    {
        label: 'Five options',
        propState: {
            options: [
                {
                    value: '1',
                    label: 'Item 1 With Longer Label',
                    icon: 'Settings',
                    iconSelected: 'SettingsFill',
                },
                {
                    value: '2',
                    label: 'Item 2 With Longer Label',
                    icon: 'Cloud',
                    iconSelected: 'CloudFill',
                },
                {
                    value: '3',
                    label: 'Item 3 With Longer Label',
                    icon: 'Smartphone',
                    iconSelected: 'SmartphoneFill',
                },
                {
                    value: '4',
                    label: 'Item 4 With Longer Label',
                    icon: 'Event',
                    iconSelected: 'EventFill',
                },
                {
                    value: '5',
                    label: 'Item 5 With Longer Label',
                    icon: 'Person',
                    iconSelected: 'PersonFill',
                },
            ],
            value: '1',
            label: 'Single Icon',
        },
    },
    {
        label: 'Disabled option',
        propState: {
            options: [
                {
                    value: '1',
                    label: 'Item 1',
                    icon: 'Settings',
                    iconSelected: 'SettingsFill',
                },
                {
                    value: '2',
                    label: 'Item 2',
                    icon: 'Cloud',
                    iconSelected: 'CloudFill',
                    disabled: true,
                },
            ],
            value: '1',
            label: 'Single Icon',
        },
    },
];

export const BottomNavigationExample: ComponentExample<BottomNavigationProps> = {
    containerStyle: {
        height: '200px',
        width: '100%',
        padding: 0,
        justifyContent: 'end',
    },
    defaultState: {
        value: '1',
        options: presets[0].propState.options.map((option) => ({
            ...option,
            icon: undefined,
            iconSelected: undefined,
        })),
        label: 'Single Icon',
    },
    disableProps: [],
    presets,
    render: ({ props, Component }) => <Component {...props} />,
    sections: [],
    variants: false,
};
