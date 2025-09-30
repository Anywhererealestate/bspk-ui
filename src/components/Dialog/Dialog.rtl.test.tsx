import { Dialog } from './Dialog';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <Dialog disableFocusTrap onClose={() => {}} open>
        <h1>Dialog Title</h1>* <p>This is the content of the dialog.</p>*{' '}
        <button onClick={() => {}} type="button">
            Close
        </button>
    </Dialog>
);

describe('Dialog', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Dialog Title')).toBeInTheDocument();
    });
});
