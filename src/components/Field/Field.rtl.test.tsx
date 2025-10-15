import { Field, FieldDescription, FieldError, FieldLabel } from './';
import { Input } from '-/components/Input';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <Field>
        <FieldLabel required={true}>Example label</FieldLabel>
        <Input name="example-text" onChange={() => {}} value="Input text" />
        <FieldDescription>This is an example description.</FieldDescription>
        <FieldError>This is an error message.</FieldError>
    </Field>
);

describe('Field (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Example label')).toBeInTheDocument();
    });
});
