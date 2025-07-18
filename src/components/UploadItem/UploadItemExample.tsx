import { UploadItemProps } from '.';
import { ComponentExampleFn } from '-/utils/demo';

export const UploadItemExample: ComponentExampleFn<UploadItemProps> = ({ action }) => ({
    render: ({ props, Component }) => {
        return <Component {...props} onDelete={() => action('Delete action clicked!')} />;
    },
    presets: [
        {
            label: 'basic',
            propState: {
                fileName: 'basic-file.png',
                fileSize: '1.2 MB',
                onDeleteToolTip: 'Delete',
            },
        },
        {
            label: 'state: uploading',
            propState: {
                fileName: 'I-think-this-is-a-long-file-name.txt',
                uploadStatus: 'uploading',
                onDeleteToolTip: 'Close',
            },
        },
        {
            label: 'state: success',
            propState: {
                fileName: 'success-story.pdf',
                uploadStatus: 'complete',
                onDeleteToolTip: 'Bye',
            },
        },
        {
            label: 'state: failed',
            propState: {
                fileName: 'file-name.txt',
                uploadStatus: 'error',
                onDeleteToolTip: 'Escape',
            },
        },
    ],
});
