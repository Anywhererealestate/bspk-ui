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
    /** The accepted file types for upload, e.g. ['image/png', 'image/gif', 'image/svg'] */
    acceptedFileTypes?: string[];
    /** The maximum file size allowed for upload, in MB */
    maxFileSize?: number;
    /** The error message to display when the upload fails */
    errorMessage?: string;
    files?: File[] | null;
    uploadStatus?: UploadStatus;
    uploadProgress?: number;
    onChange?: (file: File | null) => void;
    onUploadStart?: (file: File) => void;
    // onUploadProgress?: (progress: number) => void;
    // onUploadComplete?: (file: File) => void;
    onError?: (error: string, file?: File) => void;
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
    uploadSubtitle = 'SVG, PNG, JPG or GIF',
    maxFileSize = 2,
    errorMessage = 'error message',
    acceptedFileTypes = ['image/png', 'image/gif', 'image/svg'],
    files = [],
    uploadStatus = 'idle',
    uploadProgress = 0,
    onChange,
    onUploadStart,
    // onUploadProgress,
    // onUploadComplete,
    onError,
}: FileUploadProps) {
    const subtitle = `${uploadSubtitle} (max. ${maxFileSize}MB)`;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const acceptedFileTypesText = acceptedFileTypes.join(', ');
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
        // console.log('files:', files);
        // console.log('filesArr:', filesArr);
        const exceeded = filesArr.filter((file) => file.size >= maxFileSize_MB);
        setExceedMaxFileSize(exceeded);

        const acceptedFileSize = filesArr.filter((file) => file.size < maxFileSize_MB);
        setacceptedSize(acceptedFileSize);
        // console.log('acceptedSize:', acceptedFileSize);

        if (acceptedFileSize.length === 0) {
            onError?.(errorMessage, selectedFile);
            onChange?.(null);
            return;
        }

        if (exceedMaxFileSize.length > 0) {
            exceedMaxFileSize.forEach((file) => {
                onError?.(errorMessage, file);
            });
            // onChange?.(exceedMaxFileSize);
            return;
        }

        // console.log('exceedArr:', exceeded);
        // `${files[0]?.name} too large. Please upload a smaller file.`

        // if (selectedFile.size >= maxFileSize_MB) {
        //     onError?.(errorMessage, selectedFile);
        //     onChange?.(selectedFile);
        //     return;
        // }
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
        const exceeded = filesArr.filter((file) => file.size >= maxFileSize_MB);
        setExceedMaxFileSize(exceeded);

        const acceptedFileSize = filesArr.filter((file) => file.size < maxFileSize_MB);
        setacceptedSize(acceptedFileSize);

        if (acceptedFileSize.length === 0) {
            onError?.(errorMessage, filesArr[0]);
            onChange?.(null);
            return;
        }

        if (exceeded.length > 0) {
            exceeded.forEach((file) => {
                onError?.(errorMessage, file);
            });
            return;
        }

        filesArr.forEach((file) => {
            onChange?.(file);
        });
        filesArr.forEach((file) => {
            onUploadStart?.(file);
        });
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
                <Txt variant="body-small">{subtitle}</Txt>
                <input
                    accept={acceptedFileTypesText}
                    hidden={true}
                    id="temp-id"
                    multiple={dragAndDrop}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    type="file"
                />
                <Button label="Browse" onClick={handleBrowseClick} />
                {files && uploadStatus === 'error' && (
                    <InlineAlert variant="error">{`${files[0]?.name} too large. Please upload a smaller file.`}</InlineAlert>
                )}
            </div>
            {files &&
                (uploadStatus === 'uploading' || uploadStatus === 'complete' || uploadStatus === 'idle') &&
                acceptedSize.map((file) => (
                    <UploadItem
                        fileName={file.name || ''}
                        fileSize={fileSizeFormat(files[0].size)}
                        key={file.name + file.size}
                        // onDelete={() => setfile(null)}
                        onDelete={() => onChange?.(null)}
                        // progress={getUploadProgress()}
                        progress={uploadProgress}
                        uploadStatus={uploadStatus}
                    />
                ))}
            {files &&
                exceedMaxFileSize.map((file) => (
                    <UploadItem
                        failedMessage={`${file.name} too large. Please upload a smaller file.`}
                        fileName={file.name}
                        fileSize={fileSizeFormat(file.size)}
                        key={file.name + file.size}
                        // onDelete={() => {
                        //     const newFiles = filesArr.filter((_, i) => i !== idx);
                        //     onChange?.(newFiles.length ? newFiles : null);
                        // }}
                        progress={0}
                        uploadStatus="error"
                    />
                ))}

            {files && uploadStatus === 'error' && (
                <>
                    <UploadItem
                        fileName={files[0]?.name || ''}
                        fileSize={((files[0]?.size || 0) / 1024).toFixed(2)}
                        // onDelete={() => setfile(null)}
                        onDelete={() => onChange?.(null)}
                        // progress={10}
                        progress={uploadProgress}
                        uploadStatus={uploadStatus}
                        // fileSize={`${(file?.size || 0) / 1024} KB`}
                    />
                </>
            )}
            {uploadStatus === 'complete' && <InlineAlert variant="success">File uploaded successfully!</InlineAlert>}
            {/* <div>
                        <p>File Name: {file.name}</p>
                        <p>File Size: {(file.size / 1024).toFixed(2)} KB</p>
                        <p>File Size (bytes): {file.size}</p>
                        <p>File Size Format: {fileSizeFormat(file.size)}</p>
                        <p>File Type: {file.type}</p>
                        <p>upLoadStatus: {uploadStatus}</p>
                        <p>error message: {errorMessage}</p>
                    </div> */}
        </>
    );
}

FileUpload.bspkName = 'FileUpload';

export { FileUpload };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
