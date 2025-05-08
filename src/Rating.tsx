import { css } from '@emotion/react';

export type RatingProps = {
    /** The content of the rating. */
    children: string;
};

/**
 * Component description coming soon.
 *
 * @name Rating
 */
function Rating({ children }: RatingProps) {
    return (
        <div css={style} data-rating>
            {children}
        </div>
    );
}

Rating.bspkName = 'Rating';

export { Rating };

export const style = css`
    display: flex;
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
