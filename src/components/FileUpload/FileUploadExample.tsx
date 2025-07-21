import { useState } from 'react';
import { FileUploadProps } from '.';
import { ComponentExampleFn } from '-/utils/demo';
import { FileUploadStatus } from '-/utils/fileUploads';

export const FileUploadExample: ComponentExampleFn<FileUploadProps> = ({ action }) => ({
    render: ({ props, preset, Component }) => {
        return <FileUploadExampleMockUpload key={preset?.label} {...props} Component={Component} action={action} />;
    },
    presets: [
        {
            label: 'multiple files',
            propState: {
                dragAndDrop: false,
                multipleFiles: true,
            },
        },
        {
            label: 'Drag and Drop Single File',
            propState: {
                dragAndDrop: true,
                multipleFiles: false,
            },
        },
        {
            label: 'Drag and Drop Multiple Files',
            propState: {
                dragAndDrop: true,
                multipleFiles: true,
            },
        },
    ],
    hideVariants: true,
});

function FileUploadExampleRender({
    action,
    files: presetFiles,
    ...props
}: FileUploadProps & { action: (message: string) => void }) {
    const [files, setFiles] = useState<FileEntry[]>([]);

    // Here we
    const handleUpload = (nextFiles: FileEntry[]) => {
        setFiles(nextFiles);
        action(`Files uploading: ${nextFiles.map((f) => f.fileName).join(', ')}`);
    };

    useEffect(() => {
        if (Array.isArray(presetFiles) && presetFiles.length > 0) handleUpload(presetFiles);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [presetFiles]);

    return (
        <FileUpload
            {...props}
            acceptedFileTypes={['image/png', 'image/gif', 'image/svg+xml', 'image/jpeg']}
            cancelButtonLabel="Cancel"
            files={files.length > 0 ? files : undefined}
            maxFileSize={1}
            onCancel={(file) => action(`onCancel called for: ${file.fileName}`)}
            onError={(filesWithErrors) => {
                action(`Error occurred during file upload: ${filesWithErrors.map((f) => f.fileName).join(', ')}`);
            }}
            onUpload={handleUpload}
            uploadSubtitle="SVG, PNG, JPG or GIF (max. 1MB)"
        />
    );
}

function FileUploadExampleMockUpload({
    action,
    Component,
    ...props
}: FileUploadProps & {
    Component: React.ComponentType<FileUploadProps>;
    action: (msg: string) => void;
}) {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<FileUploadStatus>('idle');
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
            acceptedFileTypes={['image/png', 'image/gif', 'image/svg+xml']}
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
