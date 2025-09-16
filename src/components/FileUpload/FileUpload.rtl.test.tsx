import { FileUpload } from './FileUpload';
import { presets } from './FileUploadExample';
import { hasNoBasicA11yIssues } from '-/rtl/hasNoBasicA11yIssues';

describe('FileUpload (RTL)', () => {
    presets.forEach((preset) => {
        it(
            `has no basic a11y issues - ${preset.label}`,
            hasNoBasicA11yIssues(
                <FileUpload onCancel={() => {}} onError={() => {}} onUpload={() => {}} {...preset.propState} />,
            ),
        );
    });
});
