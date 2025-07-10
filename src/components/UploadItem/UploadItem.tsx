// import { Button } from '../Button';
import './upload-item.scss';
import { SvgDelete } from '@bspk/icons/Delete';
import { SvgDraft } from '@bspk/icons/Draft';

// import { Button } from '../Button';
import { Button } from '../Button';
import { InlineAlert } from '../InlineAlert';
import { ProgressBar } from '../ProgressBar';
import { Txt } from '../Txt';

export type UploadItemProps = {
    /** The content of the upload-item. */
    fileName?: string;
    /** The status of the uploading file. */
    uploadStatus?: 'error' | 'idle' | 'success' | 'uploading';
    /** The size of the file being uploaded. */
    fileSize?: string;
    /** The function to call when the delete button is clicked. */
    onDelete?: () => void;
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
function UploadItem({ fileName = 'here I am', uploadStatus, fileSize, onDelete }: UploadItemProps) {
    const fileSizeText = fileSize ? `${fileSize} •` : '';
    const subText = uploadStatus ? `${fileSizeText}  ${uploadStatus}` : fileSizeText;
    return (
        <div data-bspk="upload-item">
            <div data-row>
                <div data-icon>
                    <SvgDraft />
                </div>

                <div data-title>
                    <Txt>{fileName}</Txt>
                    <Txt>{subText}</Txt>
                </div>
                <Button icon={<SvgDelete />} label="Delete" onClick={onDelete} showLabel={false} variant="tertiary" />
            </div>
            <div data-status>
                {uploadStatus === 'uploading' && (
                    <ProgressBar align="left" completion={55} label="I am a progress bar" />
                )}
                {uploadStatus === 'success' && <InlineAlert variant="success">goal</InlineAlert>}
                {uploadStatus === 'error' && <InlineAlert variant="error">I am an ERROR</InlineAlert>}
            </div>
        </div>
    );
}

UploadItem.bspkName = 'UploadItem';

export { UploadItem };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
