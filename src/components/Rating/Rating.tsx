import { useMemo } from 'react';
import './rating.scss';
import { RatingStar } from './RatingStar';

const MAX_STARS = 5;

export type RatingSize = 'large' | 'medium' | 'small';

export type RatingProps = {
    /**
     * The variant of the rating.
     *
     * @minimum 0
     * @maximum 5
     */
    value: number;
    /**
     * The variant of the rating.
     *
     * @minimum 0
     * @maximum 5
     */
    onChange?: (newVal: number) => void;
    /**
     * The variant of the rating.
     *
     * @default medium
     */
    size?: RatingSize;
    /**
     * If the component should be interactive
     *
     * @default false
     */
    interactive?: boolean;
};

/**
 * Descriptive and interactive controls that allow customers to indicate their feelings about an experience or product
 * on a scale of 1 to 5. Half sizes are displayed when interactive is false.
 *
 * @example
 *     import { Rating } from '@bspk/ui/Rating';
 *
 *     function Example() {
 *         return <Rating value={4.5} />;
 *     }
 *
 * @name Rating
 * @phase WorkInProgress
 */
function Rating({ size = 'medium', value, onChange, interactive }: RatingProps) {
    const clickableProps = interactive
        ? { 'data-clickable': '', role: 'presentation' }
        : { role: 'img', 'aria-label': `${value} out of ${MAX_STARS} stars` };

    const stars = useMemo(() => {
        const starList = [];

        for (let i = 0; i < MAX_STARS; i++) {
            const diffToValue = value - i;

            const fillPercent = diffToValue >= 1 ? 1 : diffToValue < 0 ? 0 : diffToValue;

            starList.push(
                <RatingStar
                    fillPercent={fillPercent}
                    key={i}
                    onClick={interactive ? onChange : undefined}
                    size={size}
                    value={i + 1}
                />,
            );
        }

        return starList;
    }, [value, size, interactive, onChange]);

    return (
        <div data-bspk="rating" {...clickableProps} data-size={size}>
            {stars}
        </div>
    );
}

Rating.bspkName = 'Rating';

export { Rating };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
