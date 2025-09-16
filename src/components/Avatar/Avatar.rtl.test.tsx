import { Avatar } from './Avatar';
import { presets } from './AvatarExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('Avatar (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<Avatar {...preset.propState} />));
    });

    it('renders', () => {
        const { getByText } = render(<Avatar {...presets[0].propState} />);

        expect(getByText('AG')).toBeInTheDocument();
    });
});
