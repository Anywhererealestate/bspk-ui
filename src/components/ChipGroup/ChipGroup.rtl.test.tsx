import { ChipGroup } from './ChipGroup';
import { presets } from './ChipGroupExample';
import { ChipSuggestion } from '-/components/ChipSuggestion';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('ChipGroup (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(
                <ChipGroup {...preset.propState}>
                    <ChipSuggestion label="suggestion 1" onClick={() => {}} />
                    <ChipSuggestion label="suggestion 2" onClick={() => {}} />
                    <ChipSuggestion label="suggestion 3" onClick={() => {}} />
                </ChipGroup>,
            ),
        );
    });

    it('renders', () => {
        const { getByText } = render(
            <ChipGroup {...presets[1].propState}>
                <ChipSuggestion label="suggestion 1" onClick={() => {}} />
                <ChipSuggestion label="suggestion 2" onClick={() => {}} />
                <ChipSuggestion label="suggestion 3" onClick={() => {}} />
            </ChipGroup>,
        );

        expect(getByText('suggestion 1')).toBeInTheDocument();
    });
});
