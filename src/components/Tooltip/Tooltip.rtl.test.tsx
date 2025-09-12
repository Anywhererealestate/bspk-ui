import { Tooltip } from './Tooltip';
import { Button } from '-/components/Button';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <Tooltip label="Example label" placement="top">
        {(triggerProps) => (
            <Button label="Trigger button" {...triggerProps}>
                Click me
            </Button>
        )}
    </Tooltip>
);

describe('Tooltip (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Example label')).toBeInTheDocument();
    });
});
