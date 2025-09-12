import { Badge } from './Badge';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <Badge color="primary" size="small">
        Example Content
    </Badge>
);

describe('Badge (RTL)', () => {
    it(`has no basic a11y issues`, hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Example Content')).toBeInTheDocument();
    });
});
