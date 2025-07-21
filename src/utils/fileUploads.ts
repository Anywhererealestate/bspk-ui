export const DEFAULT_ERROR_MESSAGE = 'There was an error uploading the file. Please try again.';

export type FileUploadStatus = 'cancelled' | 'complete' | 'error' | 'failed' | 'idle' | 'initiated' | 'uploading';

export const FILE_UPLOAD_STATUS: Record<string, FileUploadStatus> = {
    CANCELLED: 'cancelled',
    COMPLETE: 'complete',
    ERROR: 'error',
    FAILED: 'failed',
    IDLE: 'idle',
    INITIATED: 'initiated',
    UPLOADING: 'uploading',
} as const;

export type FileEntry = {
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
     * If uploadStatus is 'error', this message will be displayed by default: "There was an error uploading the file.
     * Please try again."
     */
    errorMessage?: string;
};
