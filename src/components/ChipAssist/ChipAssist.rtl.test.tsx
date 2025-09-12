import { ChipAssist } from './ChipAssist';
import { presets } from './ChipAssistExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('ChipAssist (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<ChipAssist {...preset.propState} />));
    });

    it('renders', () => {
        const { getByText } = render(<ChipAssist {...presets[0].propState} />);

        expect(getByText('chip option')).toBeInTheDocument();
    });
});
