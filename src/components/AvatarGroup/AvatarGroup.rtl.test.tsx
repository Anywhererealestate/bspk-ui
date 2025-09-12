import { AvatarGroup } from './AvatarGroup';
import { presets } from './AvatarGroupExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('AvatarGroup (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<AvatarGroup {...preset.propState} />));
    });

    it('renders', () => {
        const { getByText } = render(<AvatarGroup {...presets[0].propState} />);

        expect(getByText('IM')).toBeInTheDocument();
    });
});
