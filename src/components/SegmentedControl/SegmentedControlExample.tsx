import { SvgCircle } from '@bspk/icons/Circle';
import { SvgDiamond } from '@bspk/icons/Diamond';
import { SvgDiamondFill } from '@bspk/icons/DiamondFill';
import { SvgSquare } from '@bspk/icons/Square';
import { SvgSquareFill } from '@bspk/icons/SquareFill';

import { SegmentedControlOption, SegmentedControlProps } from '.';
import { ComponentExample, Preset } from '-/utils/demo';

const PRESET_OPTIONS: SegmentedControlOption[] = [
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
    },
    {
        value: '3',
        label: 'Option 3',
        icon: <SvgSquare />,
        iconSelected: <SvgSquareFill />,
    },
];

export const presets: Preset<SegmentedControlProps>[] = [
    {
        label: 'With icons',
        propState: {
            options: PRESET_OPTIONS,
            iconsOnly: undefined,
            label: 'With icons',
            value: '1',
        },
    },
    {
        label: 'Icons only',
        propState: {
            label: 'Icons only',
            value: '1',
            options: PRESET_OPTIONS,
            iconsOnly: true,
        },
    },
    {
        label: 'Long label text',
        propState: {
            label: 'Long label text',
            value: '1',
            iconsOnly: undefined,
            options: PRESET_OPTIONS.map((option) => ({
                ...option,
                label: `${option.label} with a very long label text that should be truncated if it exceeds the width of the control`,
            })),
        },
    },
];

export const SegmentedControlExample: ComponentExample<SegmentedControlProps> = {
    containerStyle: { width: '100%', overflow: 'auto', alignItems: 'start' },
    defaultState: {
        options: PRESET_OPTIONS,
    },
    presets,
    variants: false,
};
