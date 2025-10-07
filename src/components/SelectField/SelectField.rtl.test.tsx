import { SelectField } from './SelectField';
import { presets } from '-/components/Select/SelectExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const nonPresetProps = {
    controlId: 'example-select-field',
    name: 'Example name',
    onChange: () => {},
    placeholder: 'Select an option',
};

describe('SelectField (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<SelectField {...preset.propState} {...nonPresetProps} />),
        );
    });

    it('renders', () => {
        const { queryByText } = render(<SelectField {...presets[0].propState} {...nonPresetProps} />);

        expect(queryByText(nonPresetProps.placeholder)).toBeInTheDocument();
    });
});
