import { format } from 'date-fns';
import { Calendar } from './Calendar';
import { presets } from './CalendarExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('Calendar (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<Calendar {...preset.propState} onChange={() => {}} />),
        );
    });

    it('renders', () => {
        const { getByText } = render(<Calendar {...presets[0].propState} onChange={() => {}} />);

        expect(getByText(format(presets[0].propState.value!, 'MMMM yyyy'))).toBeInTheDocument();
    });
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
