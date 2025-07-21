import { RatingStar, RatingSize } from './RatingStar';

import './rating.scss';

const MAX_STARS = 5;

export type RatingProps = {
    /**
     * The value of the rating.
     *
     * @minimum 0
     * @maximum 5
     */
    value: number;
    /**
     * Called when the rating value changes.
     *
     * @minimum 0
     * @maximum 5
     */
    onChange?: (newVal: number) => void;
    /**
     * The size of the rating component.
     *
     * @default medium
     */
    size?: RatingSize;
    /**
     * Whether the rating is interactive or not.
     *
     * If true, the user can click on the stars to change the rating.
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
    return (
        <div
            aria-label={`${value} out of ${MAX_STARS} stars`}
            data-bspk="rating"
            data-size={size}
            role={interactive ? 'presentation' : 'img'}
        >
            {Array.from({ length: MAX_STARS }, (_, i) => {
                const starValue = i + 1;
                const diff = starValue - (interactive ? 0 : 0.5);
                const fill = diff >= 1 ? true : diff < 0 ? false : 'half';

                return (
                    <RatingStar
                        fill={fill}
                        key={i}
                        onClick={interactive ? onChange : undefined}
                        size={size}
                        value={starValue}
                    />
                );
            })}
        </div>
    );
}

Rating.bspkName = 'Rating';

export { Rating };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
