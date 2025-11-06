import './rating.scss';
import { SvgStarFill } from '@bspk/icons/StarFill';
import { ElementType, useState } from 'react';

export type RatingSize = 'large' | 'medium' | 'small';
export type RatingProps = {
    /**
     * Can only manually apply when interactive is false.
     *
     * The value of the rating between 0 and 5.
     *
     * @minimum 0
     * @maximum 5
     */
    value?: number;
    /**
     * The size of the rating.
     *
     * @default medium
     */
    size?: RatingSize;
    /**
     * If true the rating is interactive and the user can select a value. If false the rating is read only.
     *
     * @default true
     */
    interactive?: boolean;
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
export function Rating({ size = 'medium', value: valueProp, interactive = true }: RatingProps) {
    const [localValue, setLocalValue] = useState(valueProp ?? 0);
    const value = interactive ? localValue : valueProp;

    const As: ElementType = interactive ? 'button' : 'div';

    return (
        <div
            aria-label={!interactive ? 'Select a star rating' : value ? `${value} out of ${MAX_STARS} stars` : 'Rating'}
            data-bspk="rating"
            data-size={size}
            role={interactive ? 'radiogroup' : 'img'}
        >
            {Array.from({ length: MAX_STARS }, (_, index) => {
                const fill = getFill(index + 1, value);
                const selected = value !== undefined && Math.floor(value) === index;
                return (
                    <As
                        aria-checked={selected}
                        aria-hidden={!interactive}
                        aria-label={interactive ? `Rate ${index + 1}` : undefined}
                        data-fill={fill}
                        data-star
                        key={index}
                        onClick={interactive ? () => setLocalValue(index + 1) : undefined}
                        role={interactive ? 'radio' : 'presentation'}
                        tabIndex={interactive ? (selected ? 0 : -1) : -1}
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
                    </As>
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
