import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgClose } from '@bspk/icons/Close';
import { SvgCloud } from '@bspk/icons/Cloud';
import { SvgIcecream } from '@bspk/icons/Icecream';
import { SvgKeyboardArrowDown } from '@bspk/icons/KeyboardArrowDown';
import { SvgLightbulb } from '@bspk/icons/Lightbulb';
import { SvgOpportunities } from '@bspk/icons/Opportunities';
import { SvgSignLanguage } from '@bspk/icons/SignLanguage';

import { Chip } from '-/components/Chip';
import { ChipGroupProps } from '-/components/ChipGroup';
import { ComponentExampleFn, Preset } from '-/utils/demo';

export const presets: Preset<ChipGroupProps>[] = [
    { label: 'scroll', propState: { wrap: false } },
    { label: 'wrap', propState: { wrap: true } },
];

export const ChipGroupExample: ComponentExampleFn<ChipGroupProps> = ({ action }) => ({
    scope: {
        Chip,
    },
    presets,
    render: ({ props, Component }) => {
        const handleChipInputClick = () => action('Chip clicked!');

        return (
            <Component {...props}>
                <Chip
                    label="chip 1"
                    leadingIcon={<SvgLightbulb />}
                    onClick={handleChipInputClick}
                    trailingIcon={<SvgChevronRight />}
                />
                <Chip
                    label="chip 2"
                    leadingIcon={<SvgIcecream />}
                    onClick={handleChipInputClick}
                    trailingIcon={<SvgChevronRight />}
                />
                <Chip
                    label="chip 3"
                    leadingIcon={<SvgSignLanguage />}
                    onClick={handleChipInputClick}
                    trailingIcon={<SvgClose />}
                />
                <Chip
                    label="chip 4"
                    leadingIcon={<SvgOpportunities />}
                    onClick={handleChipInputClick}
                    trailingIcon={<SvgClose />}
                />
                <Chip
                    label="chip 5"
                    leadingIcon={<SvgCloud />}
                    onClick={handleChipInputClick}
                    trailingIcon={<SvgKeyboardArrowDown />}
                />
            </Component>
        );
    },
});
