import { SvgDelete } from '@bspk/icons/Delete';
import { SvgDraft } from '@bspk/icons/Draft';

import { Button } from '-/components/Button';
import { InlineAlert } from '-/components/InlineAlert';
import { ProgressBar } from '-/components/ProgressBar';
import { Txt } from '-/components/Txt';

import './file-upload-item.scss';

export type FileUploadItemProps = {
    /**
     * The content of the upload-item.
     *
     * @required
     */
    fileName: string;
    /**
     * The status of the uploading file.
     *
     * @default idle
     */
    uploadStatus?: 'complete' | 'error' | 'idle' | 'uploading';
    /**
     * The size of the file being uploaded.
     *
     * Usually in MB or KB, e.g. '1.2 MB' or '500 KB'
     */
    fileSize?: string;
    /**
     * The function to call when the delete button is clicked.
     *
     * @required
     */
    onDelete: () => void;
    /**
     * The progress of the upload, if applicable.
     *
     * Usually a number between 0 and 100 representing the percentage of the upload completed.
     *
     * @default 0
     */
    progress?: number;
    /** The message to display when the upload fails. */
    failedMessage?: string;
    /**
     * The tooltip text for the delete button.
     *
     * @default Delete
     */
    onDeleteToolTip?: string;
};

/**
 * A component that represents an uploaded item and its status.
 *
 * Usually used with FileUpload to display individual files being uploaded.
 *
 * @example
 *     import { FileUploadItem } from '@bspk/ui/FileUploadItem';
 *
 *     function Example() {
 *         return (
 *             <FileUploadItem
 *                 fileName="dunder-mifflin-paper-co.jpg"
 *                 fileSize="1.43 mb"
 *                 uploadStatus="Uploading"
 *                 onDelete={() => console.log('Delete item clicked!')}
 *             />
 *         );
 *     }
 *
 * @name FileUploadItem
 * @phase WorkInProgress
 */
function FileUploadItem({
    fileName = '',
    uploadStatus,
    fileSize,
    onDelete,
    onDeleteToolTip = 'Delete',
    progress,
    failedMessage = 'File too large. Please upload a smaller file.',
}: FileUploadItemProps) {
    const fileSizeText = fileSize ? `${fileSize}` : '';
    const uploadStatusText =
        uploadStatus === 'uploading' || uploadStatus === 'complete' || uploadStatus === 'error'
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
                    label={onDeleteToolTip}
                    onClick={onDelete}
                    showLabel={false}
                    size="large"
                    variant="tertiary"
                />
            </div>
            <div data-status>
                {uploadStatus !== 'error' && <ProgressBar align="left" completion={progressNum} label={progressText} />}
                {uploadStatus === 'error' && failedMessage && (
                    <InlineAlert variant="error">{failedMessage}</InlineAlert>
                )}
            </div>
        </div>
    );
}

FileUploadItem.bspkName = 'FileUploadItem';

export { FileUploadItem };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
