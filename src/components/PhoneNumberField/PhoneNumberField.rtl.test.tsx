import { PhoneNumberField } from './PhoneNumberField';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <PhoneNumberField
        aria-label="Phone number field"
        controlId="Example controlId"
        label="Phone number field"
        name="Example name"
        onChange={() => {}}
        value="9375551060"
    />
);

describe('PhoneNumberField (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Phone number field')).toBeInTheDocument();
    });
});
