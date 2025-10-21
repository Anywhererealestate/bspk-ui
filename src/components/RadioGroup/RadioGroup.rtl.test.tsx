import { RadioGroup } from './RadioGroup';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <RadioGroup
        label="Example label"
        name="example-name"
        onChange={() => {}}
        options={[
            {
                value: '1',
                label: 'Option 1',
                name: 'Option 1',
                description: 'Description here',
            },
            { value: '2', label: 'Option 2', name: 'Option 2' },
            { value: '3', label: 'Option 3', name: 'Option 3' },
        ]}
        value="2"
    />
);

describe('RadioGroup (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Example label')).toBeInTheDocument();
    });
});
