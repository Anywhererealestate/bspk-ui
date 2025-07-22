import { SvgDelete } from '@bspk/icons/Delete';
import { SvgDraft } from '@bspk/icons/Draft';

import { Button } from '-/components/Button';
import { InlineAlert } from '-/components/InlineAlert';
import { ProgressBar } from '-/components/ProgressBar';
import { Truncated } from '-/components/Truncated';
import { DEFAULT_ERROR_MESSAGE, FileEntry } from '-/utils/fileUploads';

import './file-upload-item.scss';

export type FileUploadItemProps = FileEntry & {
    /**
     * The function to call when the Cancel button is clicked.
     *
     * @required
     */
    onCancel: (file: Pick<FileEntry, 'fileName'>) => void;
    /**
     * The label used for tooltip text for the Cancel button.
     *
     * @default Cancel
     */
    cancelButtonLabel?: string;
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
 *                 status="Uploading"
 *                 onCancel={() => console.log('Cancel item clicked!')}
 *             />
 *         );
 *     }
 *
 * @name FileUploadItem
 * @phase WorkInProgress
 */
function FileUploadItem({
    fileName = '',
    status,
    fileSize,
    onCancel,
    cancelButtonLabel: onCancelToolTip = 'Cancel',
    progress = 0,
    errorMessage = DEFAULT_ERROR_MESSAGE,
}: FileUploadItemProps) {
    const subText = [fileSizeFormat(fileSize), status].filter(Boolean).join(' • ');

    return (
        <div data-bspk="file-upload-item">
            <div data-row>
                <div data-icon>
                    <SvgDraft />
                </div>
                <div data-info>
                    <Truncated data-file-name>{fileName}</Truncated>
                    <span data-file-details>{subText}</span>
                </div>
                <Button
                    icon={<SvgDelete />}
                    label={onCancelToolTip || 'Cancel'}
                    onClick={() => onCancel({ fileName })}
                    showLabel={false}
                    size="large"
                    variant="tertiary"
                />
            </div>
            <div data-status>
                {status === 'error' ? (
                    <InlineAlert variant="error">{errorMessage}</InlineAlert>
                ) : (
                    <ProgressBar
                        align="left"
                        completion={progress}
                        label={`${
                            Math.max(0, Math.min(100, Math.round(progress))) // Ensure completion is between 0 and 100
                        }%`}
                    />
                )}
            </div>
        </div>
    );
}

FileUploadItem.bspkName = 'FileUploadItem';

export { FileUploadItem };

const KB = 1024;
const MB = 1024 * KB;
const GB = 1024 * MB;

/**
 * This is a simple utility to format file sizes in a human-readable way
 *
 * Lets not support terrabytes or petabytes for now.
 *
 * - @param fileSize {number | null | undefined} - The size of the file in bytes.
 * - @returns {string | null | undefined} A string representing the file size in a human-readable format or the original
 *   value if it cannot be formatted.
 */
function fileSizeFormat(fileSize?: number): string | undefined {
    if (!fileSize) return 'Unknown size';

    const fileSizeMb = fileSize * MB; // Convert bytes to MB

    if (fileSizeMb < MB) return `${(fileSizeMb / KB).toFixed(2)} KB`;
    if (fileSizeMb < GB) return `${(fileSizeMb / MB).toFixed(2)} MB`;
    return `${(fileSizeMb / GB).toFixed(2)} GB`;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
