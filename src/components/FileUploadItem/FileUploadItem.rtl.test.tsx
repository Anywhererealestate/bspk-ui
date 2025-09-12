import { FileUploadItem } from './FileUploadItem';
import { presets } from './FileUploadItemExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';
import { render } from '-/rtl/util';

describe('FileUploadItem (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(<FileUploadItem id="1" onCancel={() => {}} {...preset.propState} />),
        );
    });

    it('renders', () => {
        const { getByText } = render(<FileUploadItem id="1" onCancel={() => {}} {...presets[0].propState} />);

        expect(getByText('Close')).toBeInTheDocument();
    });
});
