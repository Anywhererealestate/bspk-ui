import { SvgCloud } from '@bspk/icons/Cloud';
import { SvgCloudFill } from '@bspk/icons/CloudFill';
import { SvgSearch } from '@bspk/icons/Search';
import { SvgSettings } from '@bspk/icons/Settings';
import { SvgSettingsFill } from '@bspk/icons/SettingsFill';
import { SvgSmartphone } from '@bspk/icons/Smartphone';
import { SvgSmartphoneFill } from '@bspk/icons/SmartphoneFill';
import { BottomNavigationProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

export const presets: Preset<BottomNavigationProps>[] = [
    {
        label: 'Single Icon',
        propState: {
            options: [
                {
                    value: '1',
                    label: 'Item 1',
                    icon: <SvgSettings />,
                    iconSelected: <SvgSettings />,
                },
                {
                    value: '2',
                    label: 'Item 2',
                    icon: <SvgSearch />,
                    iconSelected: <SvgSearch />,
                },
                {
                    value: '3',
                    label: 'Item 3',
                    icon: <SvgCloud />,
                    iconSelected: <SvgCloud />,
                },
            ],
            value: '1',
            label: 'Single Icon',
        },
    },
    {
        label: 'Active Icon',
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
];

export const BottomNavigationExample: ComponentExample<BottomNavigationProps> = {
    containerStyle: { width: '100%' },
    defaultState: {
        value: '1',
    },
    disableProps: [],
    presets,
    render: ({ props, Component }) => (
        <Component
            {...props}
            options={props.options && props.options.length ? props.options : presets[0].propState.options}
        />
    ),
    sections: [],
    variants: {},
};
