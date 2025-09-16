import { SearchBar } from './SearchBar';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <SearchBar
        aria-label="Example aria-label"
        items={[
            { value: '1', label: 'Apple Pie' },
            { value: '2', label: 'Banana Split' },
            { value: '3', label: 'Cherry Tart' },
            { value: '4', label: 'Dragonfruit Sorbet' },
            { value: '5', label: 'Elderberry Jam' },
            { value: '6', label: 'Fig Newton' },
            { value: '7', label: 'Grape Soda' },
            { value: '8', label: 'Honeydew Smoothie' },
            { value: '9', label: 'Ice Cream Sandwich' },
            { value: '10', label: 'Jackfruit Pudding' },
        ]}
        name="Example name"
        onChange={() => {}}
        onSelect={() => {}}
        placeholder="Search"
        value=""
    />
);

describe('SearchBar (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Example aria-label')).toBeInTheDocument();
    });
});
