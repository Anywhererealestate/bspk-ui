import { PageHeader } from './PageHeader';
import { PageHeaderExample } from './PageHeaderExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const props = {
    ...PageHeaderExample.defaultState,
    title: 'Page Title',
};

describe('PageHeader (RTL)', () => {
    it(`has no basic a11y issues`, hasNoBasicA11yIssues(<PageHeader {...props} />));

    it('renders', () => {
        const { getByText } = render(<PageHeader {...props} />);

        expect(getByText('Page Title')).toBeInTheDocument();
    });
});

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
