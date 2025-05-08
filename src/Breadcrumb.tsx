import { css } from '@emotion/react';

export type BreadcrumbProps = {
    /**
     * The content of the breadcrumb.
     *
     * @required
     */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name Breadcrumb
 */
function Breadcrumb({ children }: BreadcrumbProps) {
    return (
        <div css={style} data-breadcrumb>
            {children}
        </div>
    );
}

Breadcrumb.bspkName = 'Breadcrumb';

export { Breadcrumb };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
