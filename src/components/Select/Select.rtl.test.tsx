import { Select } from './Select';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <Select
        label="Select an option"
        name="example-select"
        onChange={() => {}}
        options={[
            { id: '1', label: 'Option 1' },
            { id: '2', label: 'Option 2' },
            { id: '3', label: 'Option 3' },
            { id: '4', label: 'Option 4' },
            { id: '5', label: 'Option 5' },
            { id: '6', label: 'Option 6' },
            { id: '7', label: 'Option 7' },
            { id: '8', label: 'Option 8' },
            { id: '9', label: 'Option 9' },
            { id: '10', label: 'Option 10' },
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
