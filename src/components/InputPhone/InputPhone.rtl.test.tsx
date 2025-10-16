import { InputPhone } from './InputPhone';
import { Field, FieldLabel } from '-/components/Field';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <Field>
        <FieldLabel>Phone number input</FieldLabel>
        <InputPhone name="Example name" onChange={() => {}} value="9375551060" />
    </Field>
);

describe('InputPhone (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Phone number input')).toBeInTheDocument();
    });
});
