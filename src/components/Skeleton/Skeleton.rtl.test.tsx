import { Skeleton } from './Skeleton';
import { presets } from './SkeletonExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('Skeleton (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<Skeleton {...preset.propState} />));
    });

    it('renders', () => {
        const { getByLabelText } = render(<Skeleton {...presets[0].propState} />);

        expect(getByLabelText('Loading')).toBeInTheDocument();
    });
});
