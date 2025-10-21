import { SwitchOption } from './SwitchOption';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => <SwitchOption checked label="Example label" name="example-name" onChange={() => {}} />;

describe('SwitchOption (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Example label')).toBeInTheDocument();
    });
});
