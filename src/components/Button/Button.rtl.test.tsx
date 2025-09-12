import { Button } from './Button';
import { presets } from './ButtonExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('Button (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<Button {...preset.propState} />));
    });

    it('renders', () => {
        const { getByText } = render(<Button {...presets[1].propState} />);

        expect(getByText('Add')).toBeInTheDocument();
    });
});
