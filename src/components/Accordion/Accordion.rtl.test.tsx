import { Accordion } from './Accordion';
import { presets } from './AccordionExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('Accordion (RTL)', () => {
    presets.forEach((preset) => {
        it(`has no basic a11y issues - ${preset.label}`, hasNoBasicA11yIssues(<Accordion {...preset.propState} />));
    });

    it('renders its sections', () => {
        const { getByText } = render(<Accordion {...presets[0].propState} />);

        expect(getByText('Section 2')).toBeInTheDocument();
        expect(getByText('Section 3')).toBeInTheDocument();
    });
});
