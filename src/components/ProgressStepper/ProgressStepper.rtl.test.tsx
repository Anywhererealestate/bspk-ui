import { ProgressStepper } from './ProgressStepper';
import { presets } from './ProgressStepperExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('ProgressStepper (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<ProgressStepper {...preset.propState} />),
        );
    });

    it('renders', () => {
        const { getByText } = render(<ProgressStepper {...presets[0].propState} />);

        expect(getByText('Name of step 1')).toBeInTheDocument();
    });
});
