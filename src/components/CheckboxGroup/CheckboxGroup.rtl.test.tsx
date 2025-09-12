import { CheckboxGroup } from './CheckboxGroup';
import { presets } from './CheckboxGroupExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('CheckboxGroup (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<CheckboxGroup onChange={() => {}} {...preset.propState} />),
        );
    });

    it('renders', () => {
        const { getByText } = render(<CheckboxGroup {...presets[1].propState} onChange={() => {}} />);

        expect(getByText('Option 1')).toBeInTheDocument();
    });
});
