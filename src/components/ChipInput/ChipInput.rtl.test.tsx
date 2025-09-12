import { ChipInput } from './ChipInput';
import { presets } from './ChipInputExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('ChipInput (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<ChipInput {...preset.propState} />));
    });

    it('renders', () => {
        const { getByText } = render(<ChipInput {...presets[0].propState} />);

        expect(getByText('chip option')).toBeInTheDocument();
    });
});
