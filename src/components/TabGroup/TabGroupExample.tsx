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
    ],
};
