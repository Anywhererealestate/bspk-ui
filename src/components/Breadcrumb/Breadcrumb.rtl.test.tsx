import { Breadcrumb } from './Breadcrumb';
import { presets } from './BreadcrumbExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('Breadcrumb (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<Breadcrumb {...preset.propState} />));
    });

    it('renders', () => {
        const { getByText } = render(<Breadcrumb {...presets[1].propState} />);

        expect(getByText('Item 1')).toBeInTheDocument();
    });
});
