import { SkeletonText } from './SkeletonText';
import { presets } from './SkeletonTextExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('SkeletonText (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<SkeletonText {...preset.propState} />));
    });

    it('renders', () => {
        const { getByLabelText } = render(<SkeletonText {...presets[0].propState} />);

        expect(getByLabelText('Loading')).toBeInTheDocument();
    });
});
