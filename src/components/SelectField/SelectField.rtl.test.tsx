import { SelectField, SelectFieldProps } from './';
import { presets } from '-/components/Select/SelectExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const nonPresetProps = {
    name: 'Example name',
    onChange: () => {},
};

const TestBed = (props: SelectFieldProps) => (
    <>
        <SelectField {...props} placeholder="SelectField an option" />
    </>
);

describe('SelectField (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<TestBed label={preset.label} {...preset.propState} {...nonPresetProps} />),
        );
    });

    it('renders', () => {
        const { queryByText } = render(
            <TestBed label={presets[0].label} {...presets[0].propState} {...nonPresetProps} />,
        );

        expect(queryByText('SelectField an option')).toBeInTheDocument();
    });
});
