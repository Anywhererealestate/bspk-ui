import { SvgStarFill } from '@bspk/icons/StarFill';
import { ElementType, FC } from 'react';

export type RatingSize = 'large' | 'medium' | 'small';

type RatingStarProps = {
    /**
     * The size of the star.
     *
     * @default medium
     */
    size: RatingSize;
    /**
     * The percentage of the star that is filled.
     *
     * @default false
     */
    fill?: 'half' | false | true;
    /**
     * Called when the star is clicked.
     *
     * @param newValue The new value of the rating.
     */
    onClick?: (newValue: number) => void;
    /**
     * The value of the star.
     *
     * @default 0
     */
    value?: number;
};

const svgSizes: Record<RatingSize, number> = {
    small: 16,
    medium: 24,
    large: 32,
} as const;

export const RatingStar: FC<RatingStarProps> = ({ size, value = 0, fill = false, onClick }) => {
    const As: ElementType = onClick ? 'button' : 'div';

    return (
        <As
            aria-label={As === 'button' ? `Rate ${value}` : undefined}
            data-filled={fill === true || undefined}
            data-rating-star
            onClick={onClick ? () => onClick(value) : undefined}
        >
            <SvgStarFill width={svgSizes[size]} />
            {fill === 'half' && (
                <div data-partial-star-wrapper>
                    <div data-filled data-rating-star>
                        <SvgStarFill width={svgSizes[size]} />
                    </div>
                </div>
            )}
        </As>
    );
};
