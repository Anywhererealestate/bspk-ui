import { ChipSuggestion } from './ChipSuggestion';
import { presets } from './ChipSuggestionExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('ChipSuggestion (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<ChipSuggestion {...preset.propState} />),
        );
    });

    it('renders', () => {
        const { getByText } = render(<ChipSuggestion {...presets[0].propState} />);

        expect(getByText('chip option')).toBeInTheDocument();
    });
});
