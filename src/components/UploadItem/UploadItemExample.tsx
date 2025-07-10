import { ComponentExampleFn } from '-/utils/demo';

import { UploadItemProps } from '.';

export const UploadItemExample: ComponentExampleFn<UploadItemProps> = ({ action }) => ({
    render: ({ props, Component }) => {
        return <Component {...props} onDelete={() => action('Delete item clicked!')} />;
    },
    presets: [
        {
            label: 'basic',
            propState: {
                label: 'basic',
            },
        },
        {
            label: 'state: idle',
            propState: {
                label: 'chip option',
                uploadStatus: 'idle',
            },
        },
        {
            label: 'state: uploading',
            propState: {
                label: 'chip option',
                uploadStatus: 'uploading',
            },
        },
        {
            label: 'state: success',
            propState: {
                label: 'chip option',
                uploadStatus: 'success',
            },
        },
        {
            label: 'state: error',
            propState: {
                label: 'chip option',
                uploadStatus: 'error',
            },
        },
    ],
});
