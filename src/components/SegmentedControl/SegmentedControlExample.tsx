import { SvgCircle } from '@bspk/icons/Circle';
import { SvgDiamond } from '@bspk/icons/Diamond';
import { SvgDiamondFill } from '@bspk/icons/DiamondFill';
import { SvgSquare } from '@bspk/icons/Square';
import { SvgSquareFill } from '@bspk/icons/SquareFill';

import { SegmentedControlProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const SegmentedControlExample: ComponentExample<SegmentedControlProps> = {
    containerStyle: { width: '100%' },
    render: ({ props, Component }) => {
        const backupProps: Partial<SegmentedControlProps> = {} as SegmentedControlProps;

        if (!Array.isArray(props.options) || !props.options.length) {
            //   backupProps.value = '1';
            backupProps.options = [
                {
                    value: '1',
                    label: 'Option 1',
                    icon: undefined,
                    iconSelected: undefined,
                },
                {
                    value: '2',
                    label: 'Disabled 2',
                    icon: undefined,
                    iconSelected: undefined,
                    disabled: true,
                },
                {
                    value: '3',
                    label: 'Option 3',
                    icon: undefined,
                    iconSelected: undefined,
                },
            ];
        }

        return <Component {...props} {...backupProps} />;
    },
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
        {
            label: 'Icons only',
            propState: {
                iconsOnly: true,
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
    variants: true,
};
