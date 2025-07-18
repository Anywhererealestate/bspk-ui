import { useState } from 'react';
import { FileUploadProps } from '.';
import { ComponentExampleFn } from '-/utils/demo';

export const FileUploadExample: ComponentExampleFn<FileUploadProps> = ({ action }) => ({
    render: ({ props, Component }) => {
        return <FileUploadExampleMockUpload {...props} Component={Component} action={action} />;
    },
    presets: [
        {
            label: 'multiple files',
            propState: {
                multipleFiles: true,
                maxFileSize: 1,
            },
        },
        {
            label: 'Drag and Drop Single File',
            propState: {
                dragAndDrop: true,
                maxFileSize: 1,
            },
        },
        {
            label: 'Drag and Drop Multiple Files',
            propState: {
                dragAndDrop: true,
                multipleFiles: true,
                maxFileSize: 1,
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
            errorMessage="File upload failed. File either exceeds max file size or is not an accepted file type. Please try again."
            files={file ? [file] : null}
            maxFileSize={1}
            onChange={handleChange}
            onClose={() => action('onClose called')}
            onCloseToolTip="Close"
            onError={(error, selectedFile) => action(`Upload error: ${error}, ${selectedFile?.name}`)}
            onUploadStart={(selectedFile) => action(`Upload started for: ${selectedFile.name}`)}
            uploadProgress={uploadProgress}
            uploadStatus={uploadStatus}
            uploadSubtitle="SVG, PNG, JPG or GIF (max. 1MB)"
        />
    );
}
