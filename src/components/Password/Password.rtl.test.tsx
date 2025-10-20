import { Password, PasswordField } from './';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <>
        <Password aria-label="Password" name="password" onChange={() => {}} value="foo" />
        <PasswordField label="Password field" name="password-field" onChange={() => {}} value="foo" />
    </>
);

describe('Password (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Password')).toBeInTheDocument();
        expect(getByLabelText('Password field')).toBeInTheDocument();
    });
});
