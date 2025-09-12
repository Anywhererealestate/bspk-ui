import { useState } from 'react';
import { FileUploadItem } from './FileUploadItem';
import { FileUploadItemProps } from '.';
import { useTimeout } from '-/hooks/useTimeout';
import { ComponentExampleFn } from '-/utils/demo';
import { FileUploadStatus } from '-/utils/fileUploads';
import { randomNumber } from '-/utils/random';

export const presets = [
    {
        label: 'long file name',
        propState: {
            fileName: 'I-think-this-is-a-long-file-name.txt',
            status: 'uploading' as FileUploadStatus,
            cancelButtonLabel: 'Close',
            fileSize: 10,
        },
    },
    {
        label: 'state: uploading',
        propState: {
            fileName: 'basic-file.png',
            status: 'uploading' as FileUploadStatus,
            fileSize: 1.2,
            cancelButtonLabel: 'Cancel',
        },
    },
    {
        label: 'state: success',
        propState: {
            fileName: 'success-story.pdf',
            status: 'complete' as FileUploadStatus,
            cancelButtonLabel: 'Bye',
            fileSize: 42,
        },
    },
    {
        label: 'state: failed',
        propState: {
            fileName: 'file-name.txt',
            status: 'error' as FileUploadStatus,
            errorMessage: 'File too large. Please upload a smaller file.',
            cancelButtonLabel: 'Escape',
            fileSize: 10000000,
        },
    },
];

export const FileUploadItemExample: ComponentExampleFn<FileUploadItemProps> = ({ action }) => ({
    render: ({ props, preset }) => {
        let progress = props.progress;

        if (preset?.label === 'state: success') progress = 100;

        return (
            <FileUploadItemExampleRender
                key={preset?.label}
                {...props}
                onCancel={() => action('Cancel action clicked!')}
                progress={progress}
            />
        );
    },
    presets,
    variants: false,
});

function FileUploadItemExampleRender({ progress, ...props }: FileUploadItemProps) {
    const [progressNum, setProgressNum] = useState(progress || 0);
    const timeout = useTimeout();

    const updateProgress = (previousProgress: number) => () => {
        const next = Math.round(Math.min(previousProgress + randomNumber(0, 20), 100));
        setProgressNum(next);
        if (next < 100) timeout.set(updateProgress(next), 1000);
    };

    if (props.status === 'uploading') timeout.set(updateProgress(progressNum), 1000);

    return <FileUploadItem {...props} progress={progressNum} />;
}
