import { Input, InputField } from './';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <>
        <Input aria-label="Example label" name="input-name" onChange={() => {}} value="text value" />
        <InputField label="Example label field" name="input--field-name" onChange={() => {}} value="text value" />
    </>
);

describe('Input (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Example label')).toBeInTheDocument();
        expect(getByLabelText('Example label field')).toBeInTheDocument();
    });
});
