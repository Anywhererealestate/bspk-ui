import { CalendarPicker } from './CalendarPicker';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => <CalendarPicker onChange={() => {}} value={new Date()} />;

describe('CalendarPicker', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Previous Year')).toBeInTheDocument();
    });
});
