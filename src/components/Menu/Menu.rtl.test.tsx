import { Menu } from './Menu';
import { presets } from './MenuExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('Menu (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<Menu {...preset.propState}>Menu Children</Menu>),
        );
    });

    it('renders', () => {
        const { getByText } = render(<Menu {...presets[0].propState}>Menu Children</Menu>);

        expect(getByText('Menu Children')).toBeInTheDocument();
    });
});
