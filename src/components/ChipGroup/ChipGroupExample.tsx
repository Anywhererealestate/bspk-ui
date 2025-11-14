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
        label: 'Basic',
        propState: {
            wrap: true,
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
        label: 'Scroll',
        propState: {
            wrap: false,
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
            wrap: false,
            items: [
                { flat: true, label: 'chip 1', leadingIcon: <SvgLightbulb />, trailingIcon: <SvgChevronRight /> },
                { flat: true, label: 'chip 2', leadingIcon: <SvgIcecream />, trailingIcon: <SvgChevronRight /> },
                { flat: true, label: 'chip 3', leadingIcon: <SvgSignLanguage />, trailingIcon: <SvgClose /> },
                { flat: true, label: 'chip 4', leadingIcon: <SvgOpportunities />, trailingIcon: <SvgClose /> },
                { flat: true, label: 'chip 5', leadingIcon: <SvgCloud />, trailingIcon: <SvgKeyboardArrowDown /> },
            ],
        },
    },
    {
        label: 'Scroll: Flat & Elevated Chips',
        propState: {
            wrap: false,
            items: [
                { flat: true, label: 'chip 1', leadingIcon: <SvgLightbulb />, trailingIcon: <SvgChevronRight /> },
                { flat: false, label: 'chip 2', leadingIcon: <SvgIcecream />, trailingIcon: <SvgChevronRight /> },
                { flat: true, label: 'chip 3', leadingIcon: <SvgSignLanguage />, trailingIcon: <SvgClose /> },
                { label: 'chip 4', leadingIcon: <SvgOpportunities />, trailingIcon: <SvgClose /> },
                { flat: true, label: 'chip 5', leadingIcon: <SvgCloud />, trailingIcon: <SvgKeyboardArrowDown /> },
            ],
        },
    },
];

export const ChipGroupExample: ComponentExampleFn<ChipGroupProps> = ({ action }) => ({
    containerStyle: { width: '600px' },
    presets,
    render: ({ props, Component }) => {
        const handleChipInputClick = () => action('Chip clicked!');
        const itemsWithClick =
            props.items?.map((item) => ({
                ...item,
                onClick: handleChipInputClick,
            })) ?? undefined;
        return <Component {...props} items={itemsWithClick} />;
    },
});
