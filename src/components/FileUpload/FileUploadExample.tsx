import { useEffect, useState } from 'react';
import { FileUploadProps, FileUpload } from '.';
import { ComponentExampleFn } from '-/utils/demo';
import { FileEntry } from '-/utils/fileUploads';

export const FileUploadExample: ComponentExampleFn<FileUploadProps> = ({ action }) => ({
    render: ({ props, preset }) => {
        return <FileUploadExampleRender key={preset?.label} {...props} action={action} />;
    },
    presets: [
        {
            label: 'Drag and Drop',
            propState: {
                multipleFiles: true,
                dragAndDrop: true,
                files: [],
            },
        },
        {
            label: 'Input',
            propState: {
                multipleFiles: true,
                dragAndDrop: false,
                files: [],
            },
        },
        {
            label: 'Multiple Existing Files',
            propState: {
                multipleFiles: true,
                files: [
                    {
                        fileName: 'file1.png',
                        fileSize: 1.2,
                        status: 'complete',
                        progress: 100,
                    },
                    {
                        fileName: 'file2.gif',
                        fileSize: 0.8,
                        status: 'uploading',
                        progress: 51,
                    },
                    {
                        fileName: 'file2.gif',
                        fileSize: 0.4,
                        status: 'uploading',
                        progress: 0,
                    },
                ],
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
