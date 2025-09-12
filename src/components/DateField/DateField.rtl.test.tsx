import { DateField } from './DateField';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <DateField
        aria-label="calendar input"
        controlId="Example controlId"
        label="calendar input"
        name="calendar input"
        onChange={() => {}}
        value={new Date()}
    />
);

describe('DateField', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('calendar input')).toBeInTheDocument();
    });
});
