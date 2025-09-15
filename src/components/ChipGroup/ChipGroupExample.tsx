import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgClose } from '@bspk/icons/Close';
import { SvgCloud } from '@bspk/icons/Cloud';
import { SvgIcecream } from '@bspk/icons/Icecream';
import { SvgKeyboardArrowDown } from '@bspk/icons/KeyboardArrowDown';
import { SvgLightbulb } from '@bspk/icons/Lightbulb';
import { SvgOpportunities } from '@bspk/icons/Opportunities';
import { SvgSignLanguage } from '@bspk/icons/SignLanguage';

import { ChipAssist } from '-/components/ChipAssist';
import { ChipFilter } from '-/components/ChipFilter';
import { ChipGroup, ChipGroupProps } from '-/components/ChipGroup';
import { ChipInput } from '-/components/ChipInput';
import { ChipSuggestion } from '-/components/ChipSuggestion';
import { ChipUtility } from '-/components/ChipUtility';
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
    // containerStyle: { width: '100%' },
    render: ({ props, preset }) => {
        if (!preset) return null;

        const handleChipInputClick = () => action('Chip clicked!');

        switch (preset.label) {
            case 'wrap':
                return (
                    <ChipGroup {...props}>
                        <ChipUtility
                            label="chip 1"
                            leadingIcon={<SvgLightbulb />}
                            onClick={handleChipInputClick}
                            trailingIcon={<SvgChevronRight />}
                        />
                        <ChipUtility
                            label="chip 2"
                            leadingIcon={<SvgIcecream />}
                            onClick={handleChipInputClick}
                            trailingIcon={<SvgChevronRight />}
                        />
                        <ChipUtility
                            label="chip 3"
                            leadingIcon={<SvgSignLanguage />}
                            onClick={handleChipInputClick}
                            trailingIcon={<SvgClose />}
                        />
                        <ChipUtility
                            label="chip 4"
                            leadingIcon={<SvgOpportunities />}
                            onClick={handleChipInputClick}
                            trailingIcon={<SvgClose />}
                        />
                        <ChipUtility
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
                        <ChipUtility
                            label="chip 1"
                            leadingIcon={<SvgLightbulb />}
                            onClick={handleChipInputClick}
                            trailingIcon={<SvgChevronRight />}
                        />
                        <ChipUtility
                            label="chip 2"
                            leadingIcon={<SvgIcecream />}
                            onClick={handleChipInputClick}
                            trailingIcon={<SvgChevronRight />}
                        />
                        <ChipUtility
                            label="chip 3"
                            leadingIcon={<SvgSignLanguage />}
                            onClick={handleChipInputClick}
                            trailingIcon={<SvgClose />}
                        />
                        <ChipUtility
                            label="chip 4"
                            leadingIcon={<SvgOpportunities />}
                            onClick={handleChipInputClick}
                            trailingIcon={<SvgClose />}
                        />
                        <ChipUtility
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
                        <ChipSuggestion label="suggestion 1" onClick={handleChipInputClick} />
                        <ChipSuggestion label="suggestion 2" onClick={handleChipInputClick} />
                        <ChipSuggestion label="suggestion 3" onClick={handleChipInputClick} />
                        <ChipSuggestion label="suggestion 4" onClick={handleChipInputClick} />
                        <ChipSuggestion label="suggestion 5" onClick={handleChipInputClick} />
                    </ChipGroup>
                );
            case 'assist':
                return (
                    <ChipGroup {...props}>
                        <ChipAssist label="assist 1" leadingIcon={<SvgLightbulb />} onClick={handleChipInputClick} />
                        <ChipAssist label="assist 2" onClick={handleChipInputClick} />
                        <ChipAssist label="assist 3" leadingIcon={<SvgSignLanguage />} onClick={handleChipInputClick} />
                        <ChipAssist label="assist 4" onClick={handleChipInputClick} />
                        <ChipAssist label="assist 5" leadingIcon={<SvgCloud />} onClick={handleChipInputClick} />
                    </ChipGroup>
                );
            case 'input':
                return (
                    <ChipGroup {...props}>
                        <ChipInput label="input 1" onClick={handleChipInputClick} removable={false} />
                        <ChipInput label="input 2" onClick={handleChipInputClick} />
                        <ChipInput label="input 3" onClick={handleChipInputClick} />
                        <ChipInput label="input 4" onClick={handleChipInputClick} />
                        <ChipInput label="input 5" onClick={handleChipInputClick} />
                    </ChipGroup>
                );
            case 'filter':
                return (
                    <ChipGroup {...props}>
                        <ChipFilter label="filter 1" onClick={handleChipInputClick} trailingIcon="SvgClose" />
                        <ChipFilter label="filter 2" onClick={handleChipInputClick} trailingIcon="SvgChevronRight" />
                        <ChipFilter
                            label="filter 3"
                            onClick={handleChipInputClick}
                            trailingIcon="SvgKeyboardArrowDown"
                        />
                        <ChipFilter label="filter 1" onClick={handleChipInputClick} trailingBadgeCount={5} />
                        <ChipFilter
                            label="filter 1"
                            leadingIcon={<SvgIcecream />}
                            onClick={handleChipInputClick}
                            trailingBadgeCount={7}
                        />
                    </ChipGroup>
                );
            default:
                return null;
        }
    },
});
