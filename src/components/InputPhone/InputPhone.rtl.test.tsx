import { InputPhone, InputPhoneField } from './';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <>
        <InputPhone name="Example name" onChange={() => {}} value="9375551060" />
        <InputPhoneField label="Example Phone" name="Example name" onChange={() => {}} value="9375551060" />
    </>
);

describe('InputPhone (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Phone number input')).toBeInTheDocument();
    });
});
