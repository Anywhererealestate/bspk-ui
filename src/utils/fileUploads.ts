export const DEFAULT_ERROR_MESSAGE = 'There was an error uploading the file. Please try again.';

export type FileUploadStatus = 'complete' | 'error' | 'failed' | 'idle' | 'uploading';

export type FileEntry = {
    /**
     * The unique identifier for the file entry.
     *
     * This is generated client-side and should be unique for each file.
     *
     * This is useful for tracking the file during upload and handling cancellation.
     *
     * @required
     */
    id: string;
    /** The name of the file. */
    fileName: string;
    /**
     * The status of the uploading file.
     *
     * @default idle
     */
    status?: FileUploadStatus;
    /**
     * The size of the file being uploaded in MB.
     *
     * @required
     */
    fileSize: number;
    /**
     * A number between 0 and 100 representing the percentage of the upload completed.
     *
     * @default 0
     * @minimum 0
     * @maximum 100
     */
    progress?: number;
    /**
     * The error message to display when the upload fails.
     *
     * If status is 'error', this message will be displayed by default: "There was an error uploading the file. Please
     * try again."
     */
    errorMessage?: string;
};

/**
 * Common MIME types
 *
 * This list includes commonly used MIME types for various file formats.
 *
 * This is not an exhaustive list, but it covers many of the most frequently used types and can be extended as needed.
 */
export type MimeType =
    | 'application/json'
    | 'application/octet-stream'
    | 'application/pdf'
    | 'application/x-www-form-urlencoded'
    | 'application/xml'
    | 'application/zip'
    | 'audio/mpeg'
    | 'audio/wav'
    | 'image/gif'
    | 'image/jpeg'
    | 'image/png'
    | 'image/svg+xml'
    | 'image/webp'
    | 'text/css'
    | 'text/html'
    | 'text/javascript'
    | 'text/plain'
    | 'video/mp4'
    | 'video/webm';
