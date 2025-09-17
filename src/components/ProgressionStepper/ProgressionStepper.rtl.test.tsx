import { ProgressionStepper } from './ProgressionStepper';
import { presets } from './ProgressionStepperExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('ProgressionStepper (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<ProgressionStepper {...preset.propState} />),
        );
    });

    it('renders', () => {
        const { getByText } = render(<ProgressionStepper {...presets[0].propState} />);

        expect(getByText('Name of step 1')).toBeInTheDocument();
    });
});
