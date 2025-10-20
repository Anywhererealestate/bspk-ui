import { TimePicker, TimePickerField } from './';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <>
        <TimePicker aria-label="Example label" name="example-name" onChange={() => {}} value="text value" />
        <TimePickerField label="Example field label" name="example-field-name" onChange={() => {}} value="" />
    </>
);

describe('TimePicker (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { container, getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Example field label')).toBeInTheDocument();
        expect(container.querySelector(`[aria-label="Example label"]`)).toBeInTheDocument();
    });
});
