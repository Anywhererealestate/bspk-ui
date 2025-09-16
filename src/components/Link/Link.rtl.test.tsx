import { Link } from './Link';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => <Link href="https://bspk.dev" label="Example link" trailingIcon="external" />;

describe('Link (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', async () => {
        const { findByText } = render(<TestBed />);
        expect(await findByText('Example link')).toBeInTheDocument();
    });
});
