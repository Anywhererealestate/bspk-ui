import { Checkbox } from './Checkbox';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <label htmlFor="sample-checkbox">
        <Checkbox
            aria-label="Sample"
            checked={true}
            id="sample-checkbox"
            name="sample-checkbox"
            onChange={() => {}}
            value="sample"
        />
        Checkbox Label
    </label>
);

describe('Checkbox', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Checkbox Label')).toBeInTheDocument();
    });
});
