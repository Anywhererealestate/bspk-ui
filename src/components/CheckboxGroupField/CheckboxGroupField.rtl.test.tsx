import { CheckboxGroupField } from './CheckboxGroupField';
import { presets } from '-/components/CheckboxGroup/CheckboxGroupExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('CheckboxGroupField (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(
                <CheckboxGroupField label="whoop there it is" {...preset.propState} onChange={() => {}} />,
            ),
        );
    });

    it('renders', () => {
        const { getByText } = render(
            <CheckboxGroupField label="whoop there it is" {...presets[0].propState} onChange={() => {}} />,
        );

        expect(getByText('whoop there it is')).toBeInTheDocument();
    });
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
