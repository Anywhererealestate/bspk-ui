import { presets } from './SelectExample';
import { Select, SelectProps, SelectField } from './';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const nonPresetProps = {
    name: 'Example name',
    onChange: () => {},
    placeholder: 'Select an option',
};

const TestBed = (props: SelectProps) => (
    <>
        <Select {...props} />
        <SelectField label="Select Label" {...props} />
    </>
);

describe('Select (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<TestBed {...preset.propState} {...nonPresetProps} />),
        );
    });

    it('renders', () => {
        const { queryByText } = render(<TestBed {...presets[0].propState} {...nonPresetProps} />);

        expect(queryByText(nonPresetProps.placeholder)).toBeInTheDocument();
    });
});
