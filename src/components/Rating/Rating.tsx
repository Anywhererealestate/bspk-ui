import './rating.scss';
import { SvgStarFill } from '@bspk/icons/StarFill';

export type RatingSize = 'large' | 'medium' | 'small';
export type RatingProps = {
    /**
     * The value of the rating between 0 and 5.
     *
     * @minimum 0
     * @maximum 5
     */
    value?: number;
    /**
     * If included the component is interactive and this callback is fired when the user selects a new rating value.
     *
     * @param value - The new value of the rating.
     */
    onChange?: (value: number) => void;
    /**
     * The size of the rating.
     *
     * @default medium
     */
    size?: RatingSize;
};

const MAX_STARS = 5;
const iconWidths: Record<RatingSize, number> = {
    large: 32,
    medium: 24,
    small: 16,
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
 * @phase UXReview
 */
export function Rating({ size = 'medium', value, onChange }: RatingProps) {
    if (!onChange)
        return (
            <div
                aria-label={value ? `${value} out of ${MAX_STARS} stars` : 'Rating'}
                data-bspk="rating"
                data-size={size}
                role="img"
            >
                {Array.from({ length: MAX_STARS }, (_, index) => {
                    const fill = getFill(index + 1, value);
                    return (
                        <div data-fill={fill} data-star key={index} role="presentation" tabIndex={-1}>
                            <SvgStarFill width={iconWidths[size]} />
                            {fill === 'half' && (
                                <div data-fill-half>
                                    <div data-star>
                                        <SvgStarFill width={iconWidths[size]} />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );

    return (
        <div aria-label="Select a star rating" data-bspk="rating" data-size={size} role="radiogroup">
            {Array.from({ length: MAX_STARS }, (_, index) => {
                const fill = getFill(index + 1, value);
                const selected = value !== undefined && Math.floor(value) === index;
                return (
                    <button
                        aria-checked={selected}
                        aria-label={`Rate ${index + 1}`}
                        data-fill={fill}
                        data-star
                        key={index}
                        onClick={() => onChange?.(index + 1)}
                        role="radio"
                        tabIndex={selected ? 0 : -1}
                        type="button"
                    >
                        <SvgStarFill width={iconWidths[size]} />
                        {fill === 'half' && (
                            <div data-fill-half>
                                <div data-star>
                                    <SvgStarFill width={iconWidths[size]} />
                                </div>
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

function getFill(num: number, value?: number): 'full' | 'half' | undefined {
    if (value === undefined) return undefined;
    if (value >= num) return 'full';
    if (value == num - 0.5) return 'half';
    return undefined;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
