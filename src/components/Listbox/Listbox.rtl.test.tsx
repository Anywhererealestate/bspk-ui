import { Listbox } from './Listbox';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <Listbox
        items={[
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
        onChange={() => {}}
        onOutsideClick={() => {}}
        selectedValues={['1']}
    />
);

describe('Listbox (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Option 1')).toBeInTheDocument();
    });
});
