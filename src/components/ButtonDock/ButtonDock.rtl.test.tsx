import { ButtonDock } from './ButtonDock';
import { presets } from './ButtonDockExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('ButtonDock (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<ButtonDock {...preset.propState} />));
    });

    it('renders', () => {
        const { getByText } = render(<ButtonDock {...presets[0].propState} />);

        expect(getByText('Send')).toBeInTheDocument();
    });
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
