import { css } from '@emotion/react';

export type BottomNavigationProps = {
    /**
     * The content of the bottom navigation.
     *
     * @required
     */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name BottomNavigation
 */
function BottomNavigation({ children }: BottomNavigationProps) {
    return (
        <div css={style} data-bottom-navigation>
            {children}
        </div>
    );
}

BottomNavigation.bspkName = 'BottomNavigation';

export { BottomNavigation };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
