import { InlineAlert } from './InlineAlert';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => <InlineAlert label="Example informational inline alert" variant="informational" />;

describe('InlineAlert (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Example informational inline alert')).toBeInTheDocument();
    });
});
