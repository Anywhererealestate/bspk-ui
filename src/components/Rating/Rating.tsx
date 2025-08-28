import { SvgStarFill } from '@bspk/icons/StarFill';
import { ElementType } from 'react';

import './rating.scss';

const MAX_STARS = 5;

export type RatingSize = 'large' | 'medium' | 'small';

const iconWidths: Record<RatingSize, number> = {
    large: 32,
    medium: 24,
    small: 16,
};

export type RatingProps = {
    /**
     * The value of the rating between 0 and 5.
     *
     * @minimum 0
     * @maximum 5
     */
    value?: number;
    /**
     * If included the component is in interactive mode and this callback is fired when a star is selected.
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
    const As: ElementType = onChange ? 'button' : 'div';

    return (
        <div
            aria-label={onChange ? 'Select a star rating' : `${value} out of ${MAX_STARS} stars`}
            data-bspk="rating"
            data-size={size}
            role={onChange ? 'radiogroup' : 'img'}
        >
            {Array.from({ length: MAX_STARS }, (_, index) => {
                const fill = getFill(index + 1, value);
                const selected = value !== undefined && Math.floor(value) === index;
                return (
                    <As
                        aria-checked={selected}
                        aria-hidden={!onChange}
                        aria-label={onChange ? `Rate ${index + 1}` : undefined}
                        data-fill={fill}
                        data-star
                        key={index}
                        onClick={() => onChange?.(index + 1)}
                        role={onChange ? 'radio' : 'presentation'}
                        tabIndex={onChange ? (selected ? 0 : -1) : -1}
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
