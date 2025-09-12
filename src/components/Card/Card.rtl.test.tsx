import { Card } from './Card';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <Card showPadding={false} variant="elevated">
        * <h3>Card Title</h3>* <p>This is some content inside the card.</p>*{' '}
    </Card>
);

describe('Card', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Card Title')).toBeInTheDocument();
    });
});
