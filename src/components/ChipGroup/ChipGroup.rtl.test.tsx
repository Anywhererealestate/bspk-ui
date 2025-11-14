import { ChipGroup } from './ChipGroup';
import { presets } from './ChipGroupExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('ChipGroup (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(
                <ChipGroup
                    {...preset.propState}
                    items={[
                        { label: 'suggestion 1', onClick: () => {} },
                        { label: 'suggestion 2', onClick: () => {} },
                        { label: 'suggestion 3', onClick: () => {} },
                    ]}
                />,
            ),
        );
    });

    it('renders', () => {
        const { getByText } = render(
            <ChipGroup
                {...presets[1].propState}
                items={[
                    { label: 'suggestion 1', onClick: () => {} },
                    { label: 'suggestion 2', onClick: () => {} },
                    { label: 'suggestion 3', onClick: () => {} },
                ]}
            />,
        );

        expect(getByText('suggestion 1')).toBeInTheDocument();
    });
});
