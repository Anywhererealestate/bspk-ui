import { InputPhone, InputPhoneField } from './';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <>
        <InputPhone aria-label="Phone number input" name="example-name" onChange={() => {}} value="9375551060" />
        <InputPhoneField
            label="Phone number input field"
            name="example-name-field"
            onChange={() => {}}
            value="9375551060"
        />
    </>
);

describe('InputPhone (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getAllByLabelText } = render(<TestBed />);

        expect(getAllByLabelText('Phone number input')[0]).toBeInTheDocument();
        expect(getAllByLabelText('Phone number input field')[0]).toBeInTheDocument();
    });
});
