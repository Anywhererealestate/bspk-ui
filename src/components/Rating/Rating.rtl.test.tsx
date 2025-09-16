import { Rating } from './Rating';
import { presets } from './RatingExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('Rating (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<Rating {...preset.propState} />));
    });

    it('renders', () => {
        const { getByLabelText } = render(<Rating {...presets[0].propState} />);

        expect(getByLabelText('Rating')).toBeInTheDocument();
    });
});
