import { SvgCloudUpload } from '@bspk/icons/CloudUpload';
import { useRef, ChangeEvent, useState } from 'react';
import { Button } from '-/components/Button';
import { FileUploadItem } from '-/components/FileUploadItem';
import { InlineAlert } from '-/components/InlineAlert';
import { Txt } from '-/components/Txt';

import './file-upload.scss';

export type FileUploadProps = {
    /** Whether to enable drag and drop functionality */
    /** @default false */
    dragAndDrop?: boolean;
    /**
     * The subtitle for the upload area
     *
     * It is recommended to include the accepted file types and maximum file size in the subtitle.
     */
    uploadSubtitle?: string;
    /** Whether to allow multiple file uploads */
    /** @default false */
    multipleFiles?: boolean;
    /** The accepted file types for upload, e.g. ['image/png', 'image/gif', 'image/svg'] */
    acceptedFileTypes?: string[];
    /** The maximum file size allowed for upload, in MB */
    maxFileSize?: number;
    /** The error message to display when the upload fails */
    errorMessage?: string;
    /** The files currently being uploaded */
    files?: File[] | null;
    /** The current upload status */
    uploadStatus?: UploadStatus;
    /** The progress of the upload, if applicable */
    uploadProgress?: number;
    /** The function to call when the file input changes */
    onChange?: (file: File | File[] | null) => void;
    /** The function to call when the upload starts */
    onUploadStart?: (file: File) => void;
    // onUploadProgress?: (progress: number) => void;
    // onUploadComplete?: (file: File) => void;
    /** The function to call when an error occurs during upload */
    onError?: (error: string, file?: File) => void;
    /** The function to call when the close button is clicked */
    onClose: () => void;
    /** The tooltip text for the close button */
    onCloseToolTip?: string;
};

/**
 * Component description.
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
type UploadStatus = 'complete' | 'error' | 'idle' | 'uploading';

function FileUpload({
    dragAndDrop = false,
    multipleFiles = false,
    uploadSubtitle,
    maxFileSize = 2,
    errorMessage = 'error message',
    acceptedFileTypes,
    files = [],
    uploadStatus,
    uploadProgress,
    onChange,
    onUploadStart,
    // onUploadProgress,
    // onUploadComplete,
    onError,
    onClose,
    onCloseToolTip = 'Close',
}: FileUploadProps) {
    // const subtitle = `${uploadSubtitle} (max. ${maxFileSize}MB)`;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const acceptedFileTypesText = acceptedFileTypes?.join(', ');
    const [exceedMaxFileSize, setExceedMaxFileSize] = useState<File[]>([]);
    const [acceptedSize, setacceptedSize] = useState<File[]>([]);

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    // Automatically start upload when a file is selected
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // convert maxFileSize from bytes to MB
        const maxFileSize_MB = maxFileSize * 1024 * 1024;
        const selectedFile = e.target.files?.[0] || null;
        if (!selectedFile) return;

        const filesArr = Array.from(e.target.files ?? []);
        if (filesArr.length === 0) return;

        const exceeded = filesArr.filter((file) => file.size >= maxFileSize_MB);
        setExceedMaxFileSize(exceeded);

        const acceptedFileSize = filesArr.filter((file) => file.size < maxFileSize_MB);
        setacceptedSize(acceptedFileSize);

        if (acceptedFileSize.length === 0) {
            onError?.(errorMessage, selectedFile);
            onChange?.(null);
            return;
        }

        if (exceedMaxFileSize.length > 0) {
            exceedMaxFileSize.forEach((file) => {
                onError?.(errorMessage, file);
            });
            return;
        }

        onChange?.(selectedFile);
        onUploadStart?.(selectedFile);
    };

    // Add state for drag-over visual feedback
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        const filesArr = Array.from(e.dataTransfer.files ?? []);
        if (filesArr.length === 0) return;

        const maxFileSize_MB = maxFileSize * 1024 * 1024;
        const acceptedTypes = acceptedFileTypes ?? [];

        // Separate files by size and type
        const exceeded: File[] = [];
        const wrongType: File[] = [];
        const accepted: File[] = [];

        filesArr.forEach((file) => {
            const typeAccepted = acceptedTypes.length === 0 || acceptedTypes.includes(file.type);
            if (!typeAccepted) {
                wrongType.push(file);
            } else if (file.size >= maxFileSize_MB) {
                exceeded.push(file);
            } else {
                accepted.push(file);
            }
        });

        // Combine all rejected files for error display
        setExceedMaxFileSize([...exceeded, ...wrongType]);
        setacceptedSize(accepted);

        // Show error for each rejected file
        [...exceeded, ...wrongType].forEach((file) => {
            const message = wrongType.includes(file) ? `File type not accepted: ${file.name}` : errorMessage;
            onError?.(message, file);
        });

        if (accepted.length > 0) {
            onChange?.(accepted);
            accepted.forEach((file) => {
                onUploadStart?.(file);
            });
        } else if ([...exceeded, ...wrongType].length > 0) {
            onChange?.(null);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const fileSizeFormat = (fileSize: number) => {
        if (fileSize < 1024) {
            return `${fileSize} bytes`;
        }
        if (fileSize < 1024 * 1024) {
            return `${(fileSize / 1024).toFixed(2)} KB`;
        }
        if (fileSize < 1024 * 1024 * 1024) {
            return `${(fileSize / (1024 * 1024)).toFixed(2)} MB`;
        }
        return `${(fileSize / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    };

    return (
        <>
            <div
                className={isDragOver ? 'drag-over' : ''}
                data-bspk="file-upload"
                onDragLeave={dragAndDrop ? handleDragLeave : undefined}
                onDragOver={dragAndDrop ? handleDragOver : undefined}
                onDrop={dragAndDrop ? handleDrop : undefined}
            >
                <SvgCloudUpload />
                <Txt variant="body-large">{dragAndDrop ? 'Drag and Drop' : 'Upload File'}</Txt>
                <Txt variant="body-small">{uploadSubtitle}</Txt>
                <input
                    accept={acceptedFileTypesText}
                    hidden={true}
                    id="temp-id"
                    multiple={multipleFiles}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    type="file"
                />
                <Button label="Browse" onClick={handleBrowseClick} />
                {files && uploadStatus === 'error' && (
                    <InlineAlert variant="error">{`${files[0]?.name} too large. Please upload a smaller file.`}</InlineAlert>
                )}
            </div>
            {acceptedSize.map((file, idx) => (
                <FileUploadItem
                    fileName={file.name || ''}
                    fileSize={fileSizeFormat(file.size)}
                    key={file.name + file.size}
                    onDelete={onClose}
                    onDeleteToolTip={onCloseToolTip}
                    progress={Array.isArray(uploadProgress) ? uploadProgress[idx] : uploadProgress}
                    uploadStatus={uploadStatus}
                />
            ))}
            {exceedMaxFileSize.map((file) => (
                <FileUploadItem
                    failedMessage={errorMessage}
                    fileName={file.name}
                    fileSize={fileSizeFormat(file.size)}
                    key={file.name + file.size}
                    onDelete={onClose}
                    onDeleteToolTip={onCloseToolTip}
                    progress={0}
                    uploadStatus="error"
                />
            ))}
        </>
    );
}

FileUpload.bspkName = 'FileUpload';

export { FileUpload };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
