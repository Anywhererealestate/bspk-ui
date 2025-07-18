import './file-upload.scss';
import { SvgCloudUpload } from '@bspk/icons/CloudUpload';
import { useRef, ChangeEvent, useState } from 'react';
import { Button } from '-/components/Button';
import { InlineAlert } from '-/components/InlineAlert';
import { Txt } from '-/components/Txt';
import { UploadItem } from '-/components/UploadItem';

export type FileUploadProps = {
    /** @default false */
    dragAndDrop?: boolean;
    /** The subtitle for the upload area */
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
    files?: File[] | null;
    uploadStatus?: UploadStatus;
    uploadProgress?: number;
    onChange?: (file: File | File[] | null) => void;
    onUploadStart?: (file: File) => void;
    // onUploadProgress?: (progress: number) => void;
    // onUploadComplete?: (file: File) => void;
    onError?: (error: string, file?: File) => void;
    onClose: () => void;
    onCloseToolTip?: string;
};

/**
 * Component description.
 *
 * @example
 *     import { FileUpload } from '@bspk/ui/FileUpload';
 *
 *     function Example() {
 *         return <FileUpload>Example FileUpload</FileUpload>;
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
                <UploadItem
                    fileName={file.name || ''}
                    fileSize={fileSizeFormat(file.size)}
                    key={file.name + file.size}
                    // onDelete={() => setfile(null)}
                    // onDelete={() => onChange?.(null)}
                    onDelete={onClose}
                    // progress={getUploadProgress()}
                    // progress={uploadProgress}
                    onDeleteToolTip={onCloseToolTip}
                    progress={Array.isArray(uploadProgress) ? uploadProgress[idx] : uploadProgress}
                    uploadStatus={uploadStatus}
                />
            ))}
            {exceedMaxFileSize.map((file) => (
                <UploadItem
                    // failedMessage={`${file.name} too large. Please upload a smaller file.`}
                    failedMessage={errorMessage}
                    fileName={file.name}
                    fileSize={fileSizeFormat(file.size)}
                    key={file.name + file.size}
                    // onDelete={() => {
                    //     const newFiles = filesArr.filter((_, i) => i !== idx);
                    //     onChange?.(newFiles.length ? newFiles : null);
                    // }}
                    onDelete={onClose}
                    onDeleteToolTip={onCloseToolTip}
                    progress={0}
                    uploadStatus="error"
                />
            ))}

            {/* {files && uploadStatus === 'error' && (
                <>
                    <UploadItem
                        fileName={files[0]?.name || ''}
                        fileSize={((files[0]?.size || 0) / 1024).toFixed(2)}
                        onDelete={() => onChange?.(null)}
                        progress={uploadProgress}
                        uploadStatus={uploadStatus}
                    />
                </>
            )} */}
            {/* {uploadStatus === 'complete' && <InlineAlert variant="success">File uploaded successfully!</InlineAlert>} */}
        </>
    );
}

FileUpload.bspkName = 'FileUpload';

export { FileUpload };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
