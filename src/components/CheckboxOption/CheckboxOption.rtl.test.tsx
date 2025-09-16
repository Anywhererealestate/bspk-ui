import { CheckboxOption } from './CheckboxOption';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <CheckboxOption
        checked
        description="This is an example checkbox option."
        label="Example Checkbox"
        name="example-checkbox-name"
        onChange={() => {}}
        value="example-checkbox-value"
    />
);

describe('CheckboxOption', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Example Checkbox')).toBeInTheDocument();
    });
});
