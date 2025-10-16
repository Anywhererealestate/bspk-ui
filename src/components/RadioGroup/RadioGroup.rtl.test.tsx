import { RadioGroup } from './RadioGroup';
import { presets } from './RadioGroupExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('RadioGroup (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<RadioGroup onChange={() => {}} {...preset.propState} />),
        );
    });

    it('renders', () => {
        const { getByText } = render(<RadioGroup {...presets[1].propState} onChange={() => {}} />);

        expect(getByText('Option 1')).toBeInTheDocument();
    });
});
