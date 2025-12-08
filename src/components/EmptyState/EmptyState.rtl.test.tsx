import { EmptyState } from './EmptyState';
import { presets } from './EmptyStateExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('EmptyState (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<EmptyState {...preset.propState} />));
    });

    it('renders', () => {
        const { getByText } = render(<EmptyState {...presets[0].propState} />);

        expect(getByText('No results found')).toBeInTheDocument();
    });
});
