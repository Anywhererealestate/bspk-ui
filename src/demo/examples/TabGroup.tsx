import { SvgCircle } from '@bspk/icons/Circle';
import { SvgDiamond } from '@bspk/icons/Diamond';
import { SvgDiamondFill } from '@bspk/icons/DiamondFill';
import { SvgSquare } from '@bspk/icons/Square';
import { SvgSquareFill } from '@bspk/icons/SquareFill';

import { TabGroupProps } from '../../TabGroup';
import { ComponentExample } from '../utils';

export const TabGroupExample: ComponentExample<TabGroupProps> = {
    containerStyle: { width: '100%' },
    presets: [
        {
            label: 'With icons',
            state: {
                options: [
                    {
                        value: '1',
                        label: 'Option 1',
                        icon: <SvgDiamond />,
                        iconActive: <SvgDiamondFill />,
                    },
                    {
                        value: '2',
                        label: 'Disabled 2',
                        disabled: true,
                        icon: <SvgCircle />,
                    },
                    {
                        value: '3',
                        label: 'Option 3',
                        icon: <SvgSquare />,
                        iconActive: <SvgSquareFill />,
                    },
                ],
            },
        },
        {
            label: 'With badges',
            state: {
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
                        iconActive: <SvgSquare />,
                        badge: 3,
                    },
                ],
            },
        },
    ],
};
