import { TextareaField } from './TextareaField';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <TextareaField
        aria-label="Example label"
        controlId="1"
        label="Example label"
        name="Example name"
        onChange={() => {}}
        value="text value"
    />
);

describe('TextareaField (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Example label')).toBeInTheDocument();
    });
});
