import { Popover } from './Popover';
import { Button } from '-/components/Button';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <Popover
        callToAction={{
            label: 'Action',
            onClick: () => {},
        }}
        content="This is a popover content"
        header="Popover Header"
        placement="bottom"
    >
        <Button label="Toggle popover" onClick={() => {}} />
    </Popover>
);

describe('Popover (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByLabelText } = render(<TestBed />);

        expect(getByLabelText('Toggle popover')).toBeInTheDocument();
    });
});
