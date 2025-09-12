import { ProgressBar } from './ProgressBar';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => <ProgressBar completion={50} label="Example label" />;

describe('ProgressBar (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Example label')).toBeInTheDocument();
    });
});
