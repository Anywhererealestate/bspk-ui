import { Select } from './Select';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <Select
        label="Select an option"
        name="example-select"
        onChange={() => {}}
        options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
            { value: '4', label: 'Option 4' },
            { value: '5', label: 'Option 5' },
            { value: '6', label: 'Option 6' },
            { value: '7', label: 'Option 7' },
            { value: '8', label: 'Option 8' },
            { value: '9', label: 'Option 9' },
            { value: '10', label: 'Option 10' },
        ]}
        placeholder="Select an option"
        size="medium"
        value={['1']}
    />
);

describe('Select (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Select an option')).toBeInTheDocument();
    });
});
