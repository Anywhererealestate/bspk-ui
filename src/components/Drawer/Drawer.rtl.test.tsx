import { Drawer } from './Drawer';
import { presets } from './DrawerExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('Drawer (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(
                <Drawer {...preset.propState} open>
                    Drawer content
                </Drawer>,
            ),
        );
    });

    it('renders', () => {
        const { getByText } = render(
            <Drawer {...presets[0].propState} open>
                Drawer content
            </Drawer>,
        );

        expect(getByText('Drawer content')).toBeInTheDocument();
    });
});
