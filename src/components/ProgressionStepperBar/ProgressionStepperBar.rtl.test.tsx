import { ProgressionStepperBar } from './ProgressionStepperBar';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => <ProgressionStepperBar aria-label="Example label" stepCompleted={2} stepCount={4} />;

describe('ProgressionStepperBar (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Example label')).toBeInTheDocument();
    });
});
