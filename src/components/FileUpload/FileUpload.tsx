import { SvgCloudUpload } from '@bspk/icons/CloudUpload';
import { useRef, ChangeEvent, useState, useEffect } from 'react';
import { Button } from '-/components/Button';
import {
    DEFAULT_ERROR_MESSAGE,
    FILE_UPLOAD_STATUS,
    FileEntry,
    FileUploadItem,
    FileUploadItemProps,
} from '-/components/FileUploadItem';
import { InlineAlert } from '-/components/InlineAlert';
import { Txt } from '-/components/Txt';

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
     * The accepted file types for upload, e.g. ['image/png', 'image/gif', 'image/svg']
     *
     * If not provided, all file types are accepted.
     */
    acceptedFileTypes?: string[];
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
     * @default null
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
 *         return (
 *             <FileUpload
 *                 dragAndDrop={False}
 *                 multipleFiles={true}
 *                 acceptedFileTypes={['image/png', 'image/gif', 'image/svg']}
 *                 errorMessage="File upload failed. File either exceeds max file size or is not an accepted file type. Please try again."
 *                 files={file ? [file] : null}
 *                 maxFileSize={1}
 *                 onChange={handleChange}
 *                 onClose={() => action('onClose called')}
 *                 onCloseToolTip="Close"
 *                 onError={(error, selectedFile) => action(`Upload error: ${error}, ${selectedFile?.name}`)}
 *                 onUploadStart={(selectedFile) => action(`Upload started for: ${selectedFile.name}`)}
 *                 uploadProgress={uploadProgress}
 *                 uploadStatus={uploadStatus}
 *                 uploadSubtitle="SVG, PNG, JPG or GIF (max. 1MB)"
 *             />
 *         );
 *     }
 *
 * @name FileUpload
 * @phase WorkInProgress
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
    const maxFileSize_MB = maxFileSize * MB;
    const [fileEntries, setFileEntries] = useState<FileEntry[]>(files || []);

    useEffect(() => {
        // only update file entries when uploadStatus or progress changes
        const hasChanges =
            fileEntries.length < files.length ||
            fileEntries.some((existingEntry, index) => {
                const newEntry = files[index];
                return (
                    existingEntry.uploadStatus !== newEntry.uploadStatus || existingEntry.progress !== newEntry.progress
                );
            });
        if (hasChanges) setFileEntries(files);
    }, [fileEntries, files]);

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const updateFiles = (nextFiles: File[]) => {
        const nextFileEntries: FileEntryUpload[] = nextFiles.map((file) => {
            let uploadStatus = FILE_UPLOAD_STATUS.initiated;
            let errorMessage = '';

            if (
                Array.isArray(acceptedFileTypes) &&
                acceptedFileTypes.length > 0 &&
                !acceptedFileTypes.includes(file.type)
            ) {
                uploadStatus = 'error';
                errorMessage = `File type not accepted: ${file.name}`;
            }

            if (file.size >= maxFileSize_MB) {
                uploadStatus = 'error';
                errorMessage = `File too large. Please upload a smaller file: ${file.name}`;
            }

            return {
                fileName: file.name,
                uploadStatus,
                fileSize: file.size,
                progress: 0,
                errorMessage,
                file,
            };
        });

        setFileEntries(
            nextFileEntries.map((entry) => ({
                ...entry,
                file: undefined, // Remove the file object to avoid saving large files in state
            })),
        );

        const fileEntriesWithError = nextFileEntries.filter((entry) => entry.uploadStatus === 'error');
        if (fileEntriesWithError.length > 0) onError(fileEntriesWithError);

        const fileEntriesToUpload = nextFileEntries.filter((entry) => entry.uploadStatus === 'initiated');
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
        updateFiles(Array.from(e.dataTransfer.files ?? []));
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
                    hidden={true}
                    id="temp-id"
                    multiple={multipleFiles}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    type="file"
                />
                <Button label="Browse" onClick={handleBrowseClick} />
                {files.length === 1 && files[0].uploadStatus === 'error' && (
                    <InlineAlert variant="error">{files[0].errorMessage || DEFAULT_ERROR_MESSAGE}</InlineAlert>
                )}
            </div>
            <div data-bspk-owner="file-upload" data-file-entries>
                {fileEntries
                    .sort(
                        // files with errors last
                        (a, b) =>
                            (a.uploadStatus === 'error' ? 1 : -1) + (b.uploadStatus === 'error' ? -1 : 1) ||
                            // sort by file name
                            a.fileName.localeCompare(b.fileName) ||
                            0,
                    )
                    .map(({ errorMessage, uploadStatus, fileName, fileSize, progress }) => (
                        <FileUploadItem
                            cancelButtonLabel={cancelButtonLabel}
                            errorMessage={errorMessage}
                            fileName={fileName}
                            fileSize={fileSize}
                            key={fileName + fileSize}
                            onCancel={() => onCancel({ fileName })}
                            progress={progress}
                            uploadStatus={uploadStatus}
                        />
                    ))}
            </div>
        </>
    );
}

FileUpload.bspkName = 'FileUpload';

export { FileUpload };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
