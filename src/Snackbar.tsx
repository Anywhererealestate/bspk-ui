import { css } from '@emotion/react';

export type SnackbarProps = {
    /** The content of the snackbar. */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name Snackbar
 */
function Snackbar({ children }: SnackbarProps) {
    return (
        <div css={style} data-snackbar>
            {children}
        </div>
    );
}

Snackbar.bspkName = 'Snackbar';

export { Snackbar };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
