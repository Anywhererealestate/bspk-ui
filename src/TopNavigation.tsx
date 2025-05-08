import { css } from '@emotion/react';

export type TopNavigationProps = {
    /** The content of the top navigation. */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name TopNavigation
 */
function TopNavigation({ children }: TopNavigationProps) {
    return (
        <div css={style} data-top-navigation>
            {children}
        </div>
    );
}

TopNavigation.bspkName = 'TopNavigation';

export { TopNavigation };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
