import { css } from '@emotion/react';

export type DrawerProps = {
    /**
     * The content of the drawer.
     *
     * @required
     */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name Drawer
 */
function Drawer({ children }: DrawerProps) {
    return (
        <div css={style} data-drawer>
            {children}
        </div>
    );
}

Drawer.bspkName = 'Drawer';

export { Drawer };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
