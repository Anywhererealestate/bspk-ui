import { OTPInput } from './OTPInput';
import { presets } from './OTPInputExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('OTPInput (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<OTPInput onChange={() => {}} {...preset.propState} />),
        );
    });

    it('renders', () => {
        const { getByLabelText } = render(
            <OTPInput aria-label="OTP input" onChange={() => {}} {...presets[0].propState} />,
        );

        expect(getByLabelText('OTP input')).toBeInTheDocument();
    });
});
