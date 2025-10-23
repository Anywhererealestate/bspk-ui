import { FormFieldExampleRender, presets } from './FormFieldExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('FormField (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<FormFieldExampleRender {...preset.propState} />),
        );
    });

    it('renders', () => {
        const { getByText } = render(<FormFieldExampleRender {...presets[0].propState} />);

        expect(getByText('InputPhone')).toBeInTheDocument();
    });
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
