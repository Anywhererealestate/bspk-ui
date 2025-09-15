import { useEffect, useState } from 'react';
import { FileUpload, FileUploadProps } from '.';
import { ComponentExampleFn, Preset } from '-/utils/demo';
import { FileEntry } from '-/utils/fileUploads';
import { randomNumber } from '-/utils/random';

export const presets: Preset<FileUploadProps>[] = [
    {
        label: 'multiple files',
        propState: {
            dragAndDrop: false,
            multipleFiles: true,
        },
    },
    {
        label: 'Drag and Drop Multiple Files',
        propState: {
            dragAndDrop: true,
            multipleFiles: true,
        },
    },
];

export const FileUploadExample: ComponentExampleFn<FileUploadProps> = ({ action }) => ({
    render: ({ props, preset }) => {
        return <FileUploadExampleMockUpload key={preset?.label} {...props} action={action} />;
    },
    presets,
    variants: false,
});

function FileUploadExampleMockUpload({
    action,
    files: presetFiles,
    ...props
}: FileUploadProps & { action: (message: string) => void }) {
    const [files, setFiles] = useState<FileEntry[]>([]);

    // Here we
    const handleUpload = (nextFiles: FileEntry[]) => {
        setFiles(nextFiles);
        // mock the upload action by incrementally updating the progress and eventually setting the status to 'complete'

        nextFiles.forEach((file, index) => {
            setTimeout(() => {
                const updatedFile: FileEntry = {
                    ...file,
                    status: 'uploading',
                    progress: 0,
                };
                setFiles((prev) => prev.map((f) => (f.id === file.id ? updatedFile : f)));

                // Simulate progress
                const interval = setInterval(() => {
                    updatedFile.progress = Math.min((updatedFile.progress || 0) + randomNumber(10, 15), 100);
                    setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...updatedFile } : f)));

                    if (updatedFile.progress === 100) {
                        clearInterval(interval);
                        updatedFile.status = 'complete';
                        setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...updatedFile } : f)));
                        action(`File upload complete: ${file.fileName}`);
                    }
                }, 350);
            }, index * 400); // stagger uploads
        });

        action(`Files uploading: ${nextFiles.map((f) => f.fileName).join(', ')}`);
    };

    useEffect(() => {
        if (Array.isArray(presetFiles) && presetFiles.length > 0) {
            handleUpload(presetFiles);
        }
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
