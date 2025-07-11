import './file-upload.scss';
import { SvgCloudUpload } from '@bspk/icons/CloudUpload';
import { useRef, ChangeEvent, useState } from 'react';
import { Button } from '-/components/Button';
import { InlineAlert } from '-/components/InlineAlert';
import { Txt } from '-/components/Txt';
import { UploadItem } from '-/components/UploadItem';

const DEFAULT = {
    variant: 'none',
} as const;

export type FileUploadProps = {
    /**
     * The variant of the file-upload.
     *
     * @default none
     */
    variant?: 'none';
    /** @default false */
    dragAndDrop?: false;

    uploadSubtitle?: string;

    acceptedFileTypes?: string[];

    maxFileSize?: string;

    errorMessage?: string;

    uploadStatus?: 'error' | 'idle' | 'success' | 'uploading';
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
type uploadStatus = 'error' | 'idle' | 'success' | 'uploading';

function FileUpload({
    dragAndDrop = false,
    uploadSubtitle = 'SVG, PNG, JPG or GIF',
    maxFileSize = '4MB',
    errorMessage = 'Unsupported file',
    variant = DEFAULT.variant,
    acceptedFileTypes = ['image/png', 'image/gif', 'image/svg'],
    uploadStatus,
}: FileUploadProps) {
    const subtitle = `${uploadSubtitle} (max. ${maxFileSize})`;
    const [file, setfile] = useState<File | null>(null);
    const [status, setStatus] = useState<uploadStatus>('idle');
    // const [uploadProgress, setUploadProgress] = useState<number>(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Automatically start upload when a file is selected
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const maxFileSize_MB = 4 * 1024 * 1024; // 4MB in bytes
        if (e.target.files && e.target.files[0].size <= maxFileSize_MB) {
            const selectedFile = e.target.files[0];
            setfile(selectedFile);
            setStatus('uploading');
            // Simulate upload completion after a delay
            setTimeout(() => {
                // Here you would handle actual upload logic
                setStatus('success');
            }, 5000);
        }
    };

    const acceptedFileTypesText = acceptedFileTypes.join(', ');

    // console.log('acceptedFileTypesText', acceptedFileTypesText);

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <div data-bspk="file-upload" data-variant={variant || undefined}>
                <SvgCloudUpload />
                <Txt variant="body-large">{dragAndDrop ? 'Drag and Drop' : 'Upload File'}</Txt>
                <Txt variant="body-small">{subtitle}</Txt>
                <input
                    accept={acceptedFileTypesText}
                    hidden={true}
                    id="temp-id"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    type="file"
                    // You can add accept, multiple, onChange, etc. here as needed
                />
                <Button label="Browse" onClick={handleBrowseClick} />
                {/* {status !== 'uploading' && <Button label="upload" onClick={handleBrowseClick} />} */}
                {status === 'success' && <p>{file?.name} uploaded</p>}

                {status === 'error' && <InlineAlert variant="error">{errorMessage}</InlineAlert>}
            </div>
            {file && (
                <>
                    <UploadItem
                        fileName={file?.name || ''}
                        fileSize={((file?.size || 0) / 1024).toFixed(2)}
                        onDelete={() => setfile(null)}
                        progress={10}
                        uploadStatus={uploadStatus}
                        // fileSize={`${(file?.size || 0) / 1024} KB`}
                    />

                    <div>
                        <p>File Name: {file.name}</p>
                        <p>File Size: {(file.size / 1024).toFixed(2)} KB</p>
                        <p>File Type: {file.type}</p>
                    </div>
                </>
            )}

            {uploadStatus === 'uploading' && (
                <UploadItem
                    fileName={file?.name || ''}
                    // fileSize={`${(file?.size || 0) / 1024} KB`}
                    fileSize={((file?.size || 0) / 1024).toFixed(2)}
                    // fileType={file?.type || ''}
                    onDelete={() => setfile(null)}
                    progress={10}
                    uploadStatus={uploadStatus}
                />
            )}
            {uploadStatus === 'error' && (
                <InlineAlert variant="error">{errorMessage || 'An error occurred during the upload.'}</InlineAlert>
            )}
            {uploadStatus === 'success' && <InlineAlert variant="success">File uploaded successfully!</InlineAlert>}
        </>
    );
}

FileUpload.bspkName = 'FileUpload';

export { FileUpload };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
