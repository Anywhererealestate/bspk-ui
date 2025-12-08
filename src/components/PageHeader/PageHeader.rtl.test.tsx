import { PageHeader } from './PageHeader';
import { presets } from './PageHeaderExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('PageHeader (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<PageHeader {...preset.propState} />));
    });

    it('renders', () => {
        const { getByText } = render(<PageHeader {...presets[0].propState} />);

        expect(getByText('Page Title')).toBeInTheDocument();
    });
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
