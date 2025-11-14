import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgClose } from '@bspk/icons/Close';
import { SvgCloud } from '@bspk/icons/Cloud';
import { SvgIcecream } from '@bspk/icons/Icecream';
import { SvgKeyboardArrowDown } from '@bspk/icons/KeyboardArrowDown';
import { SvgLightbulb } from '@bspk/icons/Lightbulb';
import { SvgOpportunities } from '@bspk/icons/Opportunities';
import { SvgSignLanguage } from '@bspk/icons/SignLanguage';

// import { Chip } from '-/components/Chip';
import { ChipGroupProps } from '-/components/ChipGroup';
import { ComponentExampleFn, Preset } from '-/utils/demo';

export const presets: Preset<ChipGroupProps>[] = [
    {
        label: 'Scroll',
        propState: {
            overflow: 'scroll',
            items: [
                { label: 'chip 1', leadingIcon: <SvgLightbulb />, trailingIcon: <SvgChevronRight /> },
                { label: 'chip 2', leadingIcon: <SvgIcecream />, trailingIcon: <SvgChevronRight /> },
                { label: 'chip 3', leadingIcon: <SvgSignLanguage />, trailingIcon: <SvgClose /> },
                { label: 'chip 4', leadingIcon: <SvgOpportunities />, trailingIcon: <SvgClose /> },
                { label: 'chip 5', leadingIcon: <SvgCloud />, trailingIcon: <SvgKeyboardArrowDown /> },
            ],
        },
    },
    {
        label: 'Scroll: Flat chips',
        propState: {
            overflow: 'scroll',
            items: [
                { flat: true, label: 'chip 1', leadingIcon: <SvgLightbulb /> },
                { flat: true, label: 'chip 2', trailingIcon: <SvgChevronRight /> },
                { flat: true, label: 'chip 3', leadingIcon: <SvgSignLanguage /> },
                { flat: true, label: 'chip 4', trailingIcon: <SvgClose /> },
                { flat: true, label: 'chip 5', trailingIcon: <SvgKeyboardArrowDown /> },
            ],
        },
    },
];

export const ChipGroupExample: ComponentExampleFn<ChipGroupProps> = ({ action }) => ({
    containerStyle: { width: '600px' },
    presets,
    defaultState: {
        overflow: 'wrap',
        items: [
            { label: 'chip 1', leadingIcon: <SvgLightbulb />, trailingIcon: <SvgChevronRight /> },
            { label: 'chip 2', leadingIcon: <SvgIcecream />, trailingIcon: <SvgChevronRight /> },
            { label: 'chip 3', leadingIcon: <SvgSignLanguage />, trailingIcon: <SvgClose /> },
            { label: 'chip 4', leadingIcon: <SvgOpportunities />, trailingIcon: <SvgClose /> },
            { label: 'chip 5', leadingIcon: <SvgCloud />, trailingIcon: <SvgKeyboardArrowDown /> },
        ],
    },
    render: ({ props, Component }) => {
        return (
            <Component
                {...props}
                items={props.items?.map((item) => ({
                    ...item,
                    onClick: () => action('Chip clicked!'),
                }))}
            />
        );
    },
});
