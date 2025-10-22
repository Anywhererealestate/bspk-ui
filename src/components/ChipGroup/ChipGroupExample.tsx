import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgClose } from '@bspk/icons/Close';
import { SvgCloud } from '@bspk/icons/Cloud';
import { SvgIcecream } from '@bspk/icons/Icecream';
import { SvgKeyboardArrowDown } from '@bspk/icons/KeyboardArrowDown';
import { SvgLightbulb } from '@bspk/icons/Lightbulb';
import { SvgOpportunities } from '@bspk/icons/Opportunities';
import { SvgSignLanguage } from '@bspk/icons/SignLanguage';

import { Chip } from '-/components/Chip';
import { ChipGroup, ChipGroupProps } from '-/components/ChipGroup';
import { ComponentExampleFn, Preset } from '-/utils/demo';

export const presets: Preset<ChipGroupProps>[] = [
    { label: 'wrap', propState: { wrap: true } },
    { label: 'scroll', propState: { wrap: false } },
    { label: 'suggestion', propState: { wrap: true } },
    { label: 'assist', propState: { wrap: true } },
    { label: 'input', propState: { wrap: true } },
    { label: 'filter', propState: { wrap: true } },
];

export const ChipGroupExample: ComponentExampleFn<ChipGroupProps> = ({ action }) => ({
    presets,
    render: ({ props, preset, Component }) => {
        if (!preset) return null;

        const handleChipInputClick = () => action('Chip clicked!');

        switch (preset.label) {
            case 'wrap':
                return (
                    <ChipGroup {...props}>
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
                    </ChipGroup>
                );
            case 'scroll':
                return (
                    <ChipGroup {...props}>
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
                    </ChipGroup>
                );
            case 'suggestion':
                return (
                    <ChipGroup {...props}>
                        <Chip label="suggestion 1" onClick={handleChipInputClick} />
                        <Chip label="suggestion 2" onClick={handleChipInputClick} />
                        <Chip label="suggestion 3" onClick={handleChipInputClick} />
                        <Chip label="suggestion 4" onClick={handleChipInputClick} />
                        <Chip label="suggestion 5" onClick={handleChipInputClick} />
                    </ChipGroup>
                );
            case 'assist':
                return (
                    <ChipGroup {...props}>
                        <Chip label="assist 1" leadingIcon={<SvgLightbulb />} onClick={handleChipInputClick} />
                        <Chip label="assist 2" onClick={handleChipInputClick} />
                        <Chip label="assist 3" leadingIcon={<SvgSignLanguage />} onClick={handleChipInputClick} />
                        <Chip label="assist 4" onClick={handleChipInputClick} />
                        <Chip label="assist 5" leadingIcon={<SvgCloud />} onClick={handleChipInputClick} />
                    </ChipGroup>
                );
            case 'input':
                return (
                    <ChipGroup {...props}>
                        <Chip label="input 1" onClick={handleChipInputClick} removable={false} />
                        <Chip label="input 2" onClick={handleChipInputClick} />
                        <Chip label="input 3" onClick={handleChipInputClick} />
                        <Chip label="input 4" onClick={handleChipInputClick} />
                        <Chip label="input 5" onClick={handleChipInputClick} />
                    </ChipGroup>
                );
            case 'filter':
                return (
                    <ChipGroup {...props}>
                        <Chip label="filter 1" onClick={handleChipInputClick} trailingIcon="SvgClose" />
                        <Chip label="filter 2" onClick={handleChipInputClick} trailingIcon="SvgChevronRight" />
                        <Chip label="filter 3" onClick={handleChipInputClick} trailingIcon="SvgKeyboardArrowDown" />
                        <Chip label="filter 1" onClick={handleChipInputClick} trailingBadge={{ count: 5 }} />
                        <Chip
                            label="filter 1"
                            leadingIcon={<SvgIcecream />}
                            onClick={handleChipInputClick}
                            trailingBadge={{ count: 7 }}
                        />
                    </ChipGroup>
                );
            default:
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
        }
    },
});
