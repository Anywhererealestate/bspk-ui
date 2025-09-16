import { DateInput } from './DateInput';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <DateInput aria-label="calendar input" name="calendar input" onChange={() => {}} value={new Date()} />
);

describe('DateInput', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('calendar input')).toBeInTheDocument();
    });
});
