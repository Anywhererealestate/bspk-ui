import { TimeInput } from './TimeInput';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => <TimeInput aria-label="Example label" name="Example name" value="text value" />;

describe('TimeInput (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Open Time Picker')).toBeInTheDocument();
    });
});
