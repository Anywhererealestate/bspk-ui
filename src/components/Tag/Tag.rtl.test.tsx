import { Tag } from './Tag';
import { presets } from './TagExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('Tag (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<Tag {...preset.propState} />));
    });

    it('renders', () => {
        const { getByText } = render(<Tag {...presets[0].propState} />);

        expect(
            getByText(
                'Hello, this is a very long tag label that should be truncated if it exceeds the container width.',
            ),
        ).toBeInTheDocument();
    });
});
