// import { Button } from '../Button';
import './upload-item.scss';
import { SvgDelete } from '@bspk/icons/Delete';
import { SvgDraft } from '@bspk/icons/Draft';

import { ListItem } from '../ListItem';
import { ProgressBar } from '../ProgressBar';

export type UploadItemProps = {
    /**
     * The content of the upload-item.
     *
     * @default help
     * @required
     */
    fileName: string;
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
function UploadItem({ fileName = 'here I am' }: UploadItemProps) {
    console.log(`LABEL: ${fileName}`);
    return (
        <ListItem
            label={fileName}
            leading={<SvgDraft />}
            subText="file details"
            trailing={<ListItem.Button icon={<SvgDelete />} label="delete icon" />}
        >
            <ProgressBar completion={55} label="I am a progress bar" />
            <div>{fileName}</div>
        </ListItem>
    );
}

UploadItem.bspkName = 'UploadItem';

export { UploadItem };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
