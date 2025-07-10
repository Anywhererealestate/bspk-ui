import { SvgCircle } from '@bspk/icons/Circle';
import { SvgDiamond } from '@bspk/icons/Diamond';
import { SvgDiamondFill } from '@bspk/icons/DiamondFill';
import { SvgSquare } from '@bspk/icons/Square';
import { SvgSquareFill } from '@bspk/icons/SquareFill';

import { TabGroupProps } from '.';
import { ComponentExample } from '-/utils/demo';


export const TabGroupExample: ComponentExample<TabGroupProps> = {
    containerStyle: { width: '100%' },
    presets: [
        {
            label: 'With icons',
            propState: {
                options: [
                    {
                        value: '1',
                        label: 'Option 1',
                        icon: <SvgDiamond />,
                        iconActive: <SvgDiamondFill />,
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
                        iconActive: <SvgSquareFill />,
                        badge: undefined,
                    },
                ],
            },
        },
        {
            label: 'With badges',
            propState: {
                options: [
                    {
                        value: '1',
                        label: 'Option 1',
                        icon: undefined,
                        iconActive: undefined,
                        badge: 1,
                    },
                    {
                        value: '2',
                        label: 'Disabled 2',
                        disabled: true,
                        icon: undefined,
                        iconActive: undefined,
                        badge: 2,
                    },
                    {
                        value: '3',
                        label: 'Option 3',
                        icon: undefined,
                        iconActive: undefined,
                        badge: 3,
                    },
                ],
            },
        },
        {
            label: 'With icons & badges',
            propState: {
                options: [
                    {
                        value: '1',
                        label: 'Option 1',
                        icon: <SvgDiamond />,
                        iconActive: <SvgDiamondFill />,
                        badge: 1,
                    },
                    {
                        value: '2',
                        label: 'Disabled 2',
                        disabled: true,
                        icon: <SvgCircle />,
                        badge: 2,
                    },
                    {
                        value: '3',
                        label: 'Option 3',
                        icon: <SvgSquare />,
                        iconActive: <SvgSquareFill />,
                        badge: 3,
                    },
                ],
            },
        },
    ],
};
