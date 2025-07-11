import './upload-item.scss';
import { SvgDelete } from '@bspk/icons/Delete';
import { SvgDraft } from '@bspk/icons/Draft';

import { Button } from '-/components//Button';
import { InlineAlert } from '-/components//InlineAlert';
import { ProgressBar } from '-/components//ProgressBar';
import { Txt } from '-/components//Txt';

export type UploadItemProps = {
    /** The content of the upload-item. */
    fileName?: string;
    /** The status of the uploading file. */
    uploadStatus?: 'Complete' | 'Failed' | 'Uploading';
    /** The size of the file being uploaded. */
    fileSize?: string;
    /** The function to call when the delete button is clicked. */
    onDelete?: () => void;
    /** The progress of the upload, if applicable. */
    progress?: number;
    /** The message to display when the upload fails. */
    failedMessage?: string;
};

/**
 * Component description.
 *
 * @example
 *     import { UploadItem } from '@bspk/ui/UploadItem';
 *
 *     function Example() {
 *         return <UploadItem fileName="hello" />;
 *     }
 *
 * @name UploadItem
 * @phase WorkInProgress
 */
function UploadItem({
    fileName = '',
    uploadStatus,
    fileSize,
    onDelete,
    progress,
    failedMessage = 'File too large. Please upload a smaller file.',
}: UploadItemProps) {
    const fileSizeText = fileSize ? `${fileSize}` : '';
    const uploadStatusText =
        uploadStatus === 'Uploading' || uploadStatus === 'Complete' || uploadStatus === 'Failed'
            ? ` ${uploadStatus}`
            : '';
    const subText = uploadStatusText && fileSizeText ? `${fileSizeText} • ${uploadStatus}` : `${fileSizeText}`;
    const progressNum = typeof progress === 'number' ? progress : 0;
    const progressText = `${progressNum}%`;
    return (
        <div data-bspk="upload-item">
            <div data-row>
                <div data-icon>
                    <SvgDraft />
                </div>

                <div data-info>
                    <Txt data-file-name variant="body-small">
                        {fileName}
                    </Txt>
                    <Txt data-file-details variant="body-x-small">
                        {subText}
                    </Txt>
                </div>
                <Button
                    icon={<SvgDelete />}
                    label="Delete"
                    onClick={onDelete}
                    showLabel={false}
                    size="large"
                    variant="tertiary"
                />
            </div>
            <div data-status>
                {uploadStatus === 'Uploading' && (
                    <ProgressBar align="left" completion={progressNum} label={progressText} />
                )}
                {uploadStatus === 'Failed' && failedMessage && (
                    <InlineAlert variant="error">{failedMessage}</InlineAlert>
                )}
            </div>
        </div>
    );
}

UploadItem.bspkName = 'UploadItem';

export { UploadItem };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
