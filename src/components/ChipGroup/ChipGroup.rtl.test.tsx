import { ChipGroup } from './ChipGroup';
import { presets } from './ChipGroupExample';
import { Chip } from '-/components/Chip';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('ChipGroup (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(
                <ChipGroup {...preset.propState}>
                    <Chip label="suggestion 1" onClick={() => {}} />
                    <Chip label="suggestion 2" onClick={() => {}} />
                    <Chip label="suggestion 3" onClick={() => {}} />
                </ChipGroup>,
            ),
        );
    });

    it('renders', () => {
        const { getByText } = render(
            <ChipGroup {...presets[1].propState}>
                <Chip label="suggestion 1" onClick={() => {}} />
                <Chip label="suggestion 2" onClick={() => {}} />
                <Chip label="suggestion 3" onClick={() => {}} />
            </ChipGroup>,
        );

        expect(getByText('suggestion 1')).toBeInTheDocument();
    });
});
