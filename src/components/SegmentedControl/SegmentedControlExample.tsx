import { SvgCircle } from '@bspk/icons/Circle';
import { SvgCircleFill } from '@bspk/icons/CircleFill';
import { SvgDiamond } from '@bspk/icons/Diamond';
import { SvgDiamondFill } from '@bspk/icons/DiamondFill';
import { SvgSquare } from '@bspk/icons/Square';
import { SvgSquareFill } from '@bspk/icons/SquareFill';

import { SegmentedControlProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const SegmentedControlExample: ComponentExample<SegmentedControlProps> = {
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
                    },
                    {
                        value: '2',
                        label: 'Disabled 2',
                        disabled: true,
                        icon: <SvgCircle />,
                        iconSelected: <SvgCircleFill />,
                    },
                    {
                        value: '3',
                        label: 'Option 3',
                        icon: <SvgSquare />,
                        iconSelected: <SvgSquareFill />,
                    },
                ],
            },
        },
    ],
};
