import { css } from '@emotion/react';

export type ChartProps = {
    /**
     * The content of the chart.
     *
     * @required
     */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name Chart
 */
function Chart({ children }: ChartProps) {
    return (
        <div css={style} data-chart>
            {children}
        </div>
    );
}

Chart.bspkName = 'Chart';

export { Chart };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
