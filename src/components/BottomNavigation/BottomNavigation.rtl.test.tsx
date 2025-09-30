import { BottomNavigation } from './BottomNavigation';
import { presets } from './BottomNavigationExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('BottomNavigation (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<BottomNavigation onChange={() => {}} {...preset.propState} />),
        );
    });

    it('renders', () => {
        const { getByText } = render(<BottomNavigation onChange={() => {}} {...presets[0].propState} />);

        expect(getByText('Item 1')).toBeInTheDocument();
    });
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
