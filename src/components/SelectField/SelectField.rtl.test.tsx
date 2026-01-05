import { SelectField } from '.';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <SelectField label="Example field label" name="example-field-name" onChange={() => {}} options={[]} value="" />
);

describe('SelectField (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getAllByLabelText } = render(<TestBed />);

        expect(getAllByLabelText('Example field label')[0]).toBeInTheDocument();
    });
});
