import { css } from '@emotion/react';

export type ButtonDockProps = {
    /**
     * The content of the button dock.
     *
     * @required
     */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name ButtonDock
 */
function ButtonDock({ children }: ButtonDockProps) {
    return (
        <div css={style} data-button-dock>
            {children}
        </div>
    );
}

ButtonDock.bspkName = 'ButtonDock';

export { ButtonDock };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
