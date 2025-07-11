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
            },
        },
        {
            label: 'state: uploading',
            propState: {
                fileName: 'I-think-this-is-a-long-file-name.txt',
                uploadStatus: 'uploading',
            },
        },
        {
            label: 'state: success',
            propState: {
                fileName: 'success-story.pdf',
                uploadStatus: 'success',
            },
        },
        {
            label: 'state: failed',
            propState: {
                fileName: 'file-name.txt',
                uploadStatus: 'error',
            },
        },
    ],
});
