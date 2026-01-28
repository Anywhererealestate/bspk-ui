import { Grid } from './Grid';
import { GridExample } from './GridExample';

import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const testBed = () => <Grid {...GridExample.defaultState}>{GridExample.defaultState?.children}</Grid>;

describe('Grid (RTL)', () => {
    it(`has no basic a11y issues - ${GridExample.defaultState}`, hasNoBasicA11yIssues(testBed()));

    it('renders', () => {
        const { getByText } = render(testBed());
        expect(getByText('Cell 1')).toBeInTheDocument();
        expect(getByText('Cell 2')).toBeInTheDocument();
    });
});

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
