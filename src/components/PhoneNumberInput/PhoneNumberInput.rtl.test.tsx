import { PhoneNumberInput } from './PhoneNumberInput';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <PhoneNumberInput aria-label="Phone number input" name="Example name" onChange={() => {}} value="9375551060" />
);

describe('PhoneNumberInput (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Phone number input')).toBeInTheDocument();
    });
});
