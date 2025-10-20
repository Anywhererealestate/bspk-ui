import { Password, PasswordField } from './';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <>
        <Password aria-label="Password field" name="Example name" onChange={() => {}} value="foo" />
        <PasswordField label="Password field" name="Example name" onChange={() => {}} value="foo" />
    </>
);

describe('Password (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Password field')).toBeInTheDocument();
    });
});
