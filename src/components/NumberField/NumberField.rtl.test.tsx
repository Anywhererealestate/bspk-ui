import { NumberField } from './NumberField';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <NumberField
        aria-label="Example label"
        controlId="Example controlId"
        label="Example label"
        name="Example name"
        onChange={() => {}}
        value={24}
    />
);

describe('NumberField (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Example label')).toBeInTheDocument();
    });
});
