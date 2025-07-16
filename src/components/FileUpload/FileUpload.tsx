import './file-upload.scss';
import { SvgCloudUpload } from '@bspk/icons/CloudUpload';
import { useRef, ChangeEvent } from 'react';
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
    file?: File | null;
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
    file,
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

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    // Automatically start upload when a file is selected
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // convert maxFileSize from bytes to MB
        const maxFileSize_MB = maxFileSize * 1024 * 1024;
        const selectedFile = e.target.files?.[0] || null;
        if (!selectedFile) return;

        if (selectedFile.size >= maxFileSize_MB) {
            onError?.(errorMessage, selectedFile);
            onChange?.(selectedFile);
            return;
        }
        onChange?.(selectedFile);
        onUploadStart?.(selectedFile);
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
            <div data-bspk="file-upload">
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
                    // You can add multiple, etc. here as needed
                />
                <Button label="Browse" onClick={handleBrowseClick} />
                {file && uploadStatus === 'error' && (
                    <InlineAlert variant="error">{`${file?.name} too large. Please upload a smaller file.`}</InlineAlert>
                )}
            </div>
            {file && (uploadStatus === 'uploading' || uploadStatus === 'complete' || uploadStatus === 'idle') && (
                <>
                    <UploadItem
                        fileName={file?.name || ''}
                        fileSize={fileSizeFormat(file.size)}
                        // onDelete={() => setfile(null)}
                        onDelete={() => onChange?.(null)}
                        // progress={getUploadProgress()}
                        progress={uploadProgress}
                        uploadStatus={uploadStatus}
                    />

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
            )}

            {file && uploadStatus === 'error' && (
                <>
                    <UploadItem
                        fileName={file?.name || ''}
                        fileSize={((file?.size || 0) / 1024).toFixed(2)}
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
        </>
    );
}

FileUpload.bspkName = 'FileUpload';

export { FileUpload };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
