import { ChipUtility } from './ChipUtility';
import { presets } from './ChipUtilityExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('ChipUtility (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<ChipUtility {...preset.propState} />));
    });

    it('renders', () => {
        const { getByText } = render(<ChipUtility {...presets[0].propState} />);

        expect(getByText('chip')).toBeInTheDocument();
    });
});
