import { css } from '@emotion/react';

export type FileUploadProps = {
    /**
     * The content of the fileupload.
     *
     * @required
     */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name FileUpload
 */
function FileUpload({ children }: FileUploadProps) {
    return (
        <div css={style} data-file-upload>
            {children}
        </div>
    );
}

FileUpload.bspkName = 'FileUpload';

export { FileUpload };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
