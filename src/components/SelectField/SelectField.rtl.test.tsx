import { SelectField } from './SelectField';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <SelectField
        controlId="Example controlId"
        label="Example label"
        name="Example name"
        onChange={() => {}}
        options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
        ]}
        placeholder="Select one..."
        value={['option1']}
    />
);

describe('SelectField (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Example label')).toBeInTheDocument();
    });
});
