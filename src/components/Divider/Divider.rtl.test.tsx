import { Divider } from './Divider';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';

const TestBed = () => <Divider />;

describe('Divider', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));
});
