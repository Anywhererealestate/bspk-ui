import { useEffect, useRef, useState } from 'react';
import { FileUploadProps, FileUpload } from '.';
import { ComponentExampleFn } from '-/utils/demo';
import { FILE_UPLOAD_STATUS, FileEntry } from '-/utils/fileUploads';
import { randomNumber } from '-/utils/random';

export const FileUploadExample: ComponentExampleFn<FileUploadProps> = ({ action }) => ({
    render: ({ props, preset }) => {
        return <FileUploadExampleRender key={preset?.label} {...props} action={action} />;
    },
    presets: [
        {
            label: 'Multiple Files',
            propState: {
                multipleFiles: true,
                files: [
                    {
                        fileName: 'file1.png',
                        fileSize: 1.2,
                        status: FILE_UPLOAD_STATUS.complete,
                    },
                    {
                        fileName: 'file2.gif',
                        fileSize: 0.8,
                        status: FILE_UPLOAD_STATUS.uploading,
                        progress: 50,
                    },
                ],
            },
        },
        {
            label: 'Drag and Drop Single File',
            propState: {
                dragAndDrop: true,
                multipleFiles: false,
                files: [
                    {
                        fileName: 'drag-drop-file.svg',
                        fileSize: 0.5,
                        status: FILE_UPLOAD_STATUS.initiated,
                    },
                ],
            },
        },
        {
            label: 'Drag and Drop Multiple Files',
            propState: {
                dragAndDrop: true,
                multipleFiles: true,
                files: [
                    {
                        fileName: 'drag-drop-file-1.svg',
                        fileSize: 0.5,
                        status: FILE_UPLOAD_STATUS.initiated,
                    },
                    {
                        fileName: 'drag-drop-file-2.svg',
                        fileSize: 0.8,
                        status: FILE_UPLOAD_STATUS.uploading,
                        progress: 50,
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

    const fakeFileUploader = useFakeFileUploader();

    // Here we
    const handleUpload = (nextFiles: FileEntry[]) => {
        setFiles(nextFiles);
        action(`Files uploading: ${nextFiles.map((f) => f.fileName).join(', ')}`);
        fakeFileUploader.start(nextFiles, setFiles);
    };

    useEffect(() => {
        if (Array.isArray(presetFiles) && presetFiles.length > 0) handleUpload(presetFiles);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [presetFiles]);

    return (
        <FileUpload
            {...props}
            acceptedFileTypes={['image/png', 'image/gif', 'image/svg']}
            cancelButtonLabel="Cancel"
            files={files.length > 0 ? files : undefined}
            maxFileSize={1}
            onCancel={(file) => action(`onClose called for: ${file.fileName}`)}
            onError={(filesWithErrors) => {
                action(`Error occurred during file upload: ${filesWithErrors.map((f) => f.fileName).join(', ')}`);
            }}
            onUpload={handleUpload}
            uploadSubtitle="SVG, PNG, JPG or GIF (max. 1MB)"
        />
    );
}

function useFakeFileUploader() {
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Cleanup interval on unmount
    useEffect(
        () => () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        },
        [],
    );

    return {
        start: (files: FileEntry[], setFiles: (nextFiles: FileEntry[]) => void) => {
            if (files.length === 0) return;

            let updatedFiles = files;

            // Simulate a file upload process
            intervalRef.current = setInterval(() => {
                updatedFiles = updatedFiles.map((file) => ({
                    ...file,
                    uploadStatus: FILE_UPLOAD_STATUS.uploading,
                    progress: Math.min((file.progress || 0) + randomNumber(0, 20), 100),
                }));

                setFiles(updatedFiles);

                const leastProgress = Math.min(...updatedFiles.map((f) => f.progress || 0));
                if (leastProgress >= 100) {
                    clearInterval(intervalRef.current!);
                    return;
                }
            }, 1000);
        },
    };
}
