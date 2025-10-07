import { Select } from './Select';
import { presets } from './SelectExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const nonPresetProps = {
    name: 'Example name',
    onChange: () => {},
    placeholder: 'Select an option',
};

describe('Select (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<Select {...preset.propState} {...nonPresetProps} />),
        );
    });

    it('renders', () => {
        const { queryByText } = render(<Select {...presets[0].propState} {...nonPresetProps} />);

        expect(queryByText(nonPresetProps.placeholder)).toBeInTheDocument();
    });
});
