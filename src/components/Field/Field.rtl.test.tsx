import { Field } from './';
import { Input } from '-/components/Input';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <Field
        controlId="example-field-id"
        errorMessage="This is an error message."
        helperText="This is an example description."
        label="Example label"
    >
        <Input id="example-field-id" name="example-text" onChange={() => {}} value="Input text" />
    </Field>
);

describe('Field (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Example label')).toBeInTheDocument();
    });
});
