import { TimePicker } from './TimePicker';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => <TimePicker aria-label="Example label" name="Example name" value="text value" />;

describe('TimePicker (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Open Time Picker')).toBeInTheDocument();
    });
});
