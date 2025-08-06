import { SvgCloudUpload } from '@bspk/icons/CloudUpload';
import { useRef, ChangeEvent, useState, useEffect } from 'react';
import { Button } from '-/components/Button';
import { FileUploadItem, FileUploadItemProps } from '-/components/FileUploadItem';
import { InlineAlert } from '-/components/InlineAlert';
import { Txt } from '-/components/Txt';
import { DEFAULT_ERROR_MESSAGE, FileEntry, FileUploadStatus, MimeType } from '-/utils/fileUploads';
import { randomString } from '-/utils/random';

import './file-upload.scss';

const MB = 1048576 as const;

export type FileEntryUpload = FileEntry & { file: File };

export type FileUploadProps = Pick<FileUploadItemProps, 'cancelButtonLabel' | 'onCancel'> & {
    /**
     * Whether to enable drag and drop functionality
     *
     * @default false
     */
    dragAndDrop?: boolean;
    /**
     * The subtitle for the upload area
     *
     * It is recommended to include the accepted file types and maximum file size in the subtitle.
     */
    uploadSubtitle?: string;
    /**
     * Whether to allow multiple file uploads
     *
     * @default false
     */
    multipleFiles?: boolean;
    /**
     * The accepted file types for upload, e.g. ['image/png', 'image/gif', 'image/svg+xml']
     *
     * If not provided, all file types are accepted.
     *
     * @type MimeType[]
     */
    acceptedFileTypes?: MimeType[];
    /**
     * The maximum file size allowed for upload in MB. If not provided, defaults to 2 MB.
     *
     * @default 2
     */
    maxFileSize?: number;
    /**
     * The files currently being uploaded. This is updated as files are being uploaded.
     *
     * If not provided, the component will not display any files upload items.
     *
     * @type FileEntry[]
     */
    files?: FileEntry[];
    /**
     * The function called when the upload starts
     *
     * @required
     */
    onUpload: (files: FileEntryUpload[]) => void;
    /**
     * The function called when an error occurs during upload
     *
     * @required
     */
    onError: (files: FileEntry[]) => void;
};

/**
 * A widget that allows customers to upload and attach one or more files.
 *
 * @example
 *     import { FileUpload } from '@bspk/ui/FileUpload';
 *
 *     function Example() {
 *         const [files, setFiles] = useState([]);
 *         return (
 *             <FileUpload
 *                 dragAndDrop
 *                 multipleFiles
 *                 acceptedFileTypes={['image/png', 'image/gif', 'image/svg+xml']}
 *                 files={files}
 *                 maxFileSize={5}
 *                 onError={(errorFiles) => console.log('Upload error:', errorFiles)}
 *                 onUpload={(uploadFiles) => setFiles(uploadFiles)}
 *                 uploadSubtitle="SVG, PNG, JPG or GIF (max. 5MB)"
 *             />
 *         );
 *     }
 *
 * @name FileUpload
 * @phase QA
 */
function FileUpload({
    dragAndDrop = false,
    multipleFiles = false,
    uploadSubtitle,
    maxFileSize = 2,
    acceptedFileTypes = [],
    files = [],
    onUpload,
    onError,
    onCancel,
    cancelButtonLabel = 'Cancel',
}: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const maxFileSizeMB = maxFileSize * MB;
    const [fileEntries, setFileEntries] = useState<FileEntry[]>(files || []);

    useMergedFileEntries({ fileEntries, files, setFileEntries });

    const handleBrowseClick = () => fileInputRef.current?.click();

    const updateFiles = (nextFiles: File[]) => {
        const nextFileEntries = nextFiles.map((file): FileEntryUpload => {
            let status: FileUploadStatus = 'idle';
            let errorMessage = '';

            if (
                Array.isArray(acceptedFileTypes) &&
                acceptedFileTypes.length > 0 &&
                !acceptedFileTypes.includes(file.type as MimeType)
            ) {
                status = 'error';
                errorMessage = `File type not accepted: ${file.name}`;
            }

            if (file.size > maxFileSizeMB) {
                status = 'error';
                errorMessage = `File too large. Please upload a smaller file: ${file.name}`;
            }

            return {
                id: randomString(8),
                fileName: file.name,
                status,
                fileSize: file.size / MB,
                progress: 0,
                errorMessage,
                file,
            };
        });

        setFileEntries((prev) => [
            ...prev,
            ...nextFileEntries.map((entry) => ({
                ...entry,
                file: undefined, // Remove the file object to avoid saving large files in state
            })),
        ]);

        const fileEntriesWithError = nextFileEntries.filter((entry) => entry.status === 'error');
        if (fileEntriesWithError.length > 0) onError(fileEntriesWithError);

        const fileEntriesToUpload = nextFileEntries.filter((entry) => entry.status === 'idle');
        if (fileEntriesToUpload.length > 0) onUpload(fileEntriesToUpload);
    };

    // Automatically start upload when a file is selected
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        updateFiles(Array.from(e.target.files ?? []));
    };

    // Add state for drag-over visual feedback
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);

        const droppedFiles = Array.from(e.dataTransfer.files ?? []);
        updateFiles(droppedFiles);
    };

    const handleDrag = (action: 'leave' | 'over') => (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(action === 'over');
    };

    let title = 'Drag and Drop';
    if (!dragAndDrop) title = multipleFiles ? 'Upload Files' : 'Upload a File';

    return (
        <>
            <div
                className={isDragOver ? 'drag-over' : ''}
                data-bspk="file-upload"
                onDragLeave={dragAndDrop ? handleDrag('leave') : undefined}
                onDragOver={dragAndDrop ? handleDrag('over') : undefined}
                onDrop={dragAndDrop ? handleDrop : undefined}
            >
                <SvgCloudUpload />
                <Txt variant="body-large">{title}</Txt>
                <Txt variant="body-small">{uploadSubtitle}</Txt>
                <input
                    accept={acceptedFileTypes?.join(', ')}
                    hidden
                    id="temp-id"
                    multiple={multipleFiles}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    type="file"
                />
                <Button label="Browse" onClick={handleBrowseClick} />
                {files.length === 1 && files[0].status === 'error' && (
                    <InlineAlert variant="error">{files[0].errorMessage || DEFAULT_ERROR_MESSAGE}</InlineAlert>
                )}
            </div>
            <div data-bspk-owner="file-upload" data-file-entries>
                {fileEntries
                    .sort(
                        // files with errors last
                        (a, b) =>
                            (a.status === 'error' ? 1 : -1) + (b.status === 'error' ? -1 : 1) ||
                            // sort by file name
                            a.fileName.localeCompare(b.fileName) ||
                            0,
                    )
                    .map(({ errorMessage, status, fileName, fileSize, progress, id }) => (
                        <FileUploadItem
                            cancelButtonLabel={cancelButtonLabel}
                            errorMessage={errorMessage}
                            fileName={fileName}
                            fileSize={fileSize}
                            id={id}
                            key={id}
                            onCancel={() => onCancel({ fileName })}
                            progress={progress}
                            status={status}
                        />
                    ))}
            </div>
        </>
    );
}

FileUpload.bspkName = 'FileUpload';

export { FileUpload };

function useMergedFileEntries({
    files,
    setFileEntries,
    fileEntries,
}: {
    files: FileEntry[];
    setFileEntries: (entries: FileEntry[]) => void;
    fileEntries: FileEntry[];
}) {
    useEffect(() => {
        // merge new files with existing ones
        const nextFileEntries: (FileEntry & { updated?: boolean })[] = [...fileEntries];

        // first check if there are any changes to existing file entries
        files.forEach((file) => {
            const existingEntryIndex = fileEntries.findIndex((entry) => entry.id === file.id);

            if (existingEntryIndex !== -1) {
                const updated =
                    fileEntries[existingEntryIndex].status !== file.status ||
                    fileEntries[existingEntryIndex].progress !== file.progress ||
                    fileEntries[existingEntryIndex].errorMessage !== file.errorMessage;

                if (updated)
                    nextFileEntries[existingEntryIndex] = {
                        ...fileEntries[existingEntryIndex],
                        status: file.status,
                        progress: file.progress || 0,
                        errorMessage: file.errorMessage,
                        updated,
                    };

                return;
            }

            nextFileEntries.push({
                ...file,
                updated: true,
            });
        });

        if (nextFileEntries.some((entry) => entry.updated)) setFileEntries(nextFileEntries);
    }, [fileEntries, files, setFileEntries]);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
