import { SvgCloud } from '@bspk/icons/Cloud';
import { SvgCloudFill } from '@bspk/icons/CloudFill';
import { SvgEvent } from '@bspk/icons/Event';
import { SvgEventFill } from '@bspk/icons/EventFill';
import { SvgPerson } from '@bspk/icons/Person';
import { SvgPersonFill } from '@bspk/icons/PersonFill';
import { SvgSettings } from '@bspk/icons/Settings';
import { SvgSettingsFill } from '@bspk/icons/SettingsFill';
import { SvgSmartphone } from '@bspk/icons/Smartphone';
import { SvgSmartphoneFill } from '@bspk/icons/SmartphoneFill';
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
                    icon: <SvgSettings />,
                    iconSelected: <SvgSettingsFill />,
                },
                {
                    value: '2',
                    label: 'Item 2',
                    icon: <SvgCloud />,
                    iconSelected: <SvgCloudFill />,
                },
                {
                    value: '3',
                    label: 'Item 3',
                    icon: <SvgSmartphone />,
                    iconSelected: <SvgSmartphoneFill />,
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
                    label: 'Item 1',
                    icon: <SvgSettings />,
                    iconSelected: <SvgSettingsFill />,
                },
                {
                    value: '2',
                    label: 'Item 2',
                    icon: <SvgCloud />,
                    iconSelected: <SvgCloudFill />,
                },
                {
                    value: '3',
                    label: 'Item 3',
                    icon: <SvgSmartphone />,
                    iconSelected: <SvgSmartphoneFill />,
                },
                {
                    value: '4',
                    label: 'Item 4',
                    icon: <SvgEvent />,
                    iconSelected: <SvgEventFill />,
                },
                {
                    value: '5',
                    label: 'Item 5',
                    icon: <SvgPerson />,
                    iconSelected: <SvgPersonFill />,
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
                    icon: <SvgSettings />,
                    iconSelected: <SvgSettingsFill />,
                },
                {
                    value: '2',
                    label: 'Item 2',
                    icon: <SvgCloud />,
                    iconSelected: <SvgCloudFill />,
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
        options: presets[0].propState.options,
    },
    disableProps: [],
    presets,
    render: ({ props, Component }) => <Component {...props} />,
    sections: [],
    variants: {},
};
