import { useState } from 'react';
import { FileUploadProps } from '.';
import { ComponentExampleFn } from '-/utils/demo';

export const FileUploadExample: ComponentExampleFn<FileUploadProps> = ({ action }) => ({
    render: ({ props, Component }) => {
        return <FileUploadExampleMockUpload {...props} Component={Component} action={action} />;
    },
    presets: [
        {
            label: 'Drag and Drop',
            propState: {
                dragAndDrop: true,
                maxFileSize: 1,
            },
        },
        {
            label: 'With Error Message',
            propState: {
                errorMessage: 'File size exceeds the limit.',
            },
        },
        {
            label: 'With Accepted File Types',
            propState: {
                acceptedFileTypes: ['image/png', 'image/jpeg'],
            },
        },
    ],
});

function FileUploadExampleMockUpload({
    action,
    Component,
    ...props
}: FileUploadProps & {
    Component: React.ComponentType<FileUploadProps>;
    action: (msg: string) => void;
}) {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<'complete' | 'error' | 'idle' | 'uploading'>('idle');
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const handleChange = (selectedFile: File | null) => {
        setFile(selectedFile);
        if (selectedFile) {
            setUploadStatus('uploading');
            setUploadProgress(0);

            let progress = 0;
            const interval = setInterval(() => {
                progress += 20;
                setUploadProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    setUploadStatus('complete');
                }
            }, 400);
        } else {
            setUploadStatus('idle');
            setUploadProgress(0);
        }
    };

    return (
        <Component
            {...props}
            acceptedFileTypes={['image/png', 'image/gif', 'image/svg']}
            files={file ? [file] : null}
            onChange={handleChange}
            onError={(error, selectedFile) => action(`Upload error: ${error}, ${selectedFile?.name}`)}
            onUploadStart={(selectedFile) => action(`Upload started for: ${selectedFile.name}`)}
            uploadProgress={uploadProgress}
            uploadStatus={uploadStatus}
            uploadSubtitle="Upload your image"
        />
    );
}
