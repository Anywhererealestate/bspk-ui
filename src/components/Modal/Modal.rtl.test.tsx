import { Modal } from './Modal';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const TestBed = () => (
    <Modal description="Example description" header="Example header" onClose={() => {}} open>
        Example Modal
    </Modal>
);

describe('Modal (RTL)', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', () => {
        const { getByText } = render(<TestBed />);

        expect(getByText('Example Modal')).toBeInTheDocument();
    });
});
