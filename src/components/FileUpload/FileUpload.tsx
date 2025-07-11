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

    // acceptedFileTypes?: [];

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
// type uploadStatus = 'error' | 'idle' | 'success' | 'uploading';

function FileUpload({
    dragAndDrop = false,
    uploadSubtitle = 'SVG, PNG, JPG or GIF',
    maxFileSize = '4MB',
    errorMessage = 'Unsupported file',
    variant = DEFAULT.variant,
    // acceptedFileTypes = ['jpeg', 'png', 'gif', 'svg'],
    uploadStatus,
}: FileUploadProps) {
    const subtitle = `${uploadSubtitle} (max. ${maxFileSize})`;
    const [file, setfile] = useState<File | null>(null);
    // const [status, setStatus] = useState<uploadStatus>('idle');
    // const [uploadProgress, setUploadProgress] = useState<number>(0);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setfile(e.target.files[0]);
        }
    };

    // const handleFileUpload = async () => {
    //     if (!file) return;
    //     setStatus('uploading');
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     if (file.type === 'image/jpeg') {
    //         // valid file type, proceed with upload
    //         setStatus('success');
    //     } else {
    //         setStatus('error');
    //         // Optionally show an error message
    //         return;
    //     }
    // };
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    // const handleUploadClick = () => {
    //     if (file) {
    //         handleFileUpload();
    //     } else {
    //         setStatus('error');
    //     }

    // };

    return (
        <>
            <div data-bspk="file-upload" data-variant={variant || undefined}>
                <SvgCloudUpload />
                <Txt variant="body-large">{dragAndDrop ? 'Drag and Drop' : 'Upload File'}</Txt>
                <Txt variant="body-small">{subtitle}</Txt>
                <input
                    hidden={true}
                    id="temp-id"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    type="file"
                    // You can add accept, multiple, onChange, etc. here as needed
                />
                <Button label="Browse" onClick={handleBrowseClick} />

                {status !== 'uploading' && <Button label="upload" onClick={handleBrowseClick} />}
                {status === 'success' && <p>File uploaded</p>}

                {status === 'error' && <InlineAlert variant="error">{errorMessage}</InlineAlert>}
            </div>
            {file && (
                <div>
                    <p>File Name: {file.name}</p>
                    <p>File Size: {(file.size / 1024).toFixed(2)} KB</p>
                    <p>File Type: {file.type}</p>
                </div>
            )}
            {uploadStatus === 'uploading' && (
                <UploadItem
                    progress={10}
                    fileName={file?.name || ''}
                    // fileType={file?.type || ''}
                    onDelete={() => setfile(null)}
                    uploadStatus={uploadStatus}
                    // fileSize={`${(file?.size || 0) / 1024} KB`}
                    fileSize={((file?.size || 0) / 1024).toFixed(2)}
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
