import { TextareaField } from '.';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <>
        <TextareaField label="Example field label" name="example-field-name" onChange={() => {}} value="" />
    </>
);

describe('TextareaField (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getAllByLabelText } = render(<TestBed />);

        expect(getAllByLabelText('Example field label')[0]).toBeInTheDocument();
    });
});
