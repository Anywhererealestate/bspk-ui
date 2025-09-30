import { userEvent } from '@testing-library/user-event';
import { CalendarPicker, generateItemId } from './CalendarPicker';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

const testDate = new Date('July 3, 1985');

const TestBed = () => <CalendarPicker id="my-calendar" onChange={() => {}} value={testDate} />;

describe('CalendarPicker', () => {
    it('has no basic a11y issues', hasNoBasicA11yIssues(<TestBed />));

    it('renders', async () => {
        const { getByLabelText, container } = render(<TestBed />);

        expect(getByLabelText('Previous Year')).toBeInTheDocument();

        // tab then shift+tab to focus the first focusable element
        await userEvent.tab();
        await userEvent.tab({
            shift: true,
        });

        document.activeElement?.textContent?.includes('July 1985');
        const focusedElement = container.querySelector(`[id="${generateItemId('my-calendar', testDate)}"]`);

        expect(focusedElement).toHaveFocus();
    });
});
