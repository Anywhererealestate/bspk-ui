import { InputOTP } from './InputOTP';
import { presets } from './InputOTPExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('InputOTP (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<InputOTP onChange={() => {}} {...preset.propState} />),
        );
    });

    it('renders', () => {
        const { getByLabelText } = render(<InputOTP onChange={() => {}} {...presets[0].propState} />);

        expect(getByLabelText('OTP digit 1')).toBeInTheDocument();
    });
});
