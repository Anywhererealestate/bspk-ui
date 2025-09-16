import { ListItem } from './ListItem';
import { presets } from './ListItemExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('ListItem (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<ListItem {...preset.propState} />));
    });

    it('renders', () => {
        const { getByText } = render(<ListItem {...presets[0].propState} />);

        expect(
            getByText('This is a really long label that should be truncated if it exceeds the width of the ListItem'),
        ).toBeInTheDocument();
    });
});
