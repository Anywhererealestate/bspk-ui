import { PasswordField } from './PasswordField';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <PasswordField
        aria-label="Password field"
        controlId="Example controlId"
        label="Password field"
        name="Example name"
        onChange={() => {}}
        value="foo"
    />
);

describe('PasswordField (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Password field')).toBeInTheDocument();
    });
});
