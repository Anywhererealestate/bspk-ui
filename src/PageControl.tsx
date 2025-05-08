import { css } from '@emotion/react';

export type PageControlProps = {
    /**
     * The content of the page control.
     *
     * @required
     */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name PageControl
 */
function PageControl({ children }: PageControlProps) {
    return (
        <div css={style} data-page-control>
            {children}
        </div>
    );
}

PageControl.bspkName = 'PageControl';

export { PageControl };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
