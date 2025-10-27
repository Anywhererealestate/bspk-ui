import { Chip } from './Chip';
import { presets } from './ChipExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('Chip (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<Chip {...preset.propState} />));
    });

    it('renders', () => {
        const { getByText } = render(<Chip {...presets[0].propState} />);

        expect(getByText('chip')).toBeInTheDocument();
    });
});
