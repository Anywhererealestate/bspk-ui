import { SvgCircle } from '@bspk/icons/Circle';
import { SvgDiamond } from '@bspk/icons/Diamond';
import { SvgDiamondFill } from '@bspk/icons/DiamondFill';
import { SvgSquare } from '@bspk/icons/Square';
import { SvgSquareFill } from '@bspk/icons/SquareFill';

import { TabGroupProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const TabGroupExample: ComponentExample<TabGroupProps> = {
    containerStyle: { width: '100%' },
    render: ({ props, Component }) => {
        const backupProps: Partial<TabGroupProps> = {} as TabGroupProps;

        if (!Array.isArray(props.options) || !props.options.length) {
            //   backupProps.value = '1';
            backupProps.options = [
                {
                    value: '1',
                    label: 'Option 1',
                    icon: undefined,
                    iconSelected: undefined,
                    badge: undefined,
                },
                {
                    value: '2',
                    label: 'Disabled 2',
                    icon: undefined,
                    iconSelected: undefined,
                    badge: undefined,
                    disabled: true,
                },
                {
                    value: '3',
                    label: 'Option 3',
                    icon: undefined,
                    iconSelected: undefined,
                    badge: undefined,
                },
            ];
        }

        return <Component {...props} {...backupProps} />;
    },
    presets: [
        {
            label: 'With icons',
            propState: {
                value: '1',
                options: [
                    {
                        value: '1',
                        label: 'Option 1',
                        icon: <SvgDiamond />,
                        iconSelected: <SvgDiamondFill />,
                        badge: undefined,
                    },
                    {
                        value: '2',
                        label: 'Disabled 2',
                        disabled: true,
                        icon: <SvgCircle />,
                        badge: undefined,
                    },
                    {
                        value: '3',
                        label: 'Option 3',
                        icon: <SvgSquare />,
                        iconSelected: <SvgSquareFill />,
                        badge: undefined,
                    },
                ],
            },
        },
        {
            label: 'With badges',
            propState: {
                value: '1',
                options: [
                    {
                        value: '1',
                        label: 'Option 1',
                        icon: undefined,
                        iconSelected: undefined,
                        badge: 7,
                    },
                    {
                        value: '2',
                        label: 'Disabled 2',
                        disabled: true,
                        icon: undefined,
                        iconSelected: undefined,
                        badge: 6,
                    },
                    {
                        value: '3',
                        label: 'Option 3',
                        icon: undefined,
                        iconSelected: undefined,
                        badge: 5,
                    },
                ],
            },
        },
        {
            label: 'With icons & badges',
            propState: {
                value: '1',
                options: [
                    {
                        value: '1',
                        label: 'Option 1',
                        icon: <SvgDiamond />,
                        iconSelected: <SvgDiamondFill />,
                        badge: 9,
                    },
                    {
                        value: '2',
                        label: 'Disabled 2',
                        disabled: true,
                        icon: <SvgCircle />,
                        badge: 8,
                    },
                    {
                        value: '3',
                        label: 'Option 3',
                        icon: <SvgSquare />,
                        iconSelected: <SvgSquareFill />,
                        badge: 7,
                    },
                ],
            },
        },
        {
            label: 'Text only',
            propState: {
                value: '1',
                options: [
                    {
                        value: '1',
                        label: 'Option 1 with a very long label that never seems to end and goes on forever',
                        badge: 9,
                    },
                    {
                        value: '2',
                        label: 'Disabled 2 with a very long label that never seems to end and goes on forever',
                        disabled: true,
                        badge: 8,
                    },
                    {
                        value: '3',
                        label: 'Option 3 with a very long label that never seems to end and goes on forever',
                        badge: 7,
                    },
                ],
            },
        },
    ],
};
