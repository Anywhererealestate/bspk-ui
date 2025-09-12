import { BadgeDot } from './BadgeDot';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <BadgeDot>
        <div>dot content</div>
    </BadgeDot>
);

describe('BadgeDot', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders its child content ', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('dot content')).toBeInTheDocument();
    });
});
