import { FormField } from './FormField';
import { TextInput } from '-/components/TextInput';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <FormField controlId="Example controlId" label="Example label">
        {(fieldProps) => {
            return (
                <TextInput
                    aria-label="example aria-label"
                    name="example-text"
                    onChange={() => {}}
                    value="Input text"
                    {...fieldProps}
                />
            );
        }}
    </FormField>
);

describe('FormField (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('example aria-label')).toBeInTheDocument();
    });
});
