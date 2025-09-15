import { TabGroup } from './TabGroup';
import { presets } from './TabGroupExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('TabGroup (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<TabGroup onChange={() => {}} {...preset.propState} />),
        );
    });

    it('renders', () => {
        const { getByLabelText } = render(<TabGroup onChange={() => {}} {...presets[0].propState} />);

        expect(getByLabelText('Example label')).toBeInTheDocument();
    });
});
