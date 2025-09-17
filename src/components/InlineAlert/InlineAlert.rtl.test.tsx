import { InlineAlert } from './InlineAlert';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => <InlineAlert variant="informational">Example informational inline alert</InlineAlert>;

describe('InlineAlert (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Example informational inline alert')).toBeInTheDocument();
    });
});
