import { DatePicker } from './';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <DatePicker name="calendar input" onChange={() => {}} placeholder="Select Date" value="06/03/1985" />
);

describe('DatePicker', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByPlaceholderText } = render(<TestBed />);

        expect(getByPlaceholderText('Select Date')).toBeInTheDocument();
    });
});
