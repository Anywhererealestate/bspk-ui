import { CheckboxGroupField } from '.';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <CheckboxGroupField
        label="Example field label"
        name="example-field-name"
        onChange={() => {}}
        options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
        ]}
        value={[]}
    />
);

describe('CheckboxGroupField (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getAllByText } = render(<TestBed />);

        expect(getAllByText('Example field label')[0]).toBeInTheDocument();
    });
});
