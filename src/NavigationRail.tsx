import { css } from '@emotion/react';

export type NavigationRailProps = {
    /**
     * The content of the navigation rail.
     *
     * @required
     */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name NavigationRail
 */
function NavigationRail({ children }: NavigationRailProps) {
    return (
        <div css={style} data-navigation-rail>
            {children}
        </div>
    );
}

NavigationRail.bspkName = 'NavigationRail';

export { NavigationRail };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
