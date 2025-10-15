import { RadioGroupItem } from './Item';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <RadioGroupItem
        aria-label="RadioGroupItem button"
        checked
        name="RadioGroupItem button"
        onChange={() => {}}
        value="foo"
    />
);

describe('RadioGroupItem (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('RadioGroupItem button')).toBeInTheDocument();
    });
});
