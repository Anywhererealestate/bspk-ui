import { SvgStarFill } from '@bspk/icons/StarFill';
import { FC } from 'react';
import { RatingSize } from './Rating';

type RatingStarProps = {
    size: RatingSize;
    fillPercent?: number;
    onClick?: (newValue: number) => void;
    value?: number;
};

const svgSizes = {
    small: 16,
    medium: 24,
    large: 32,
};

export const RatingStar: FC<RatingStarProps> = ({ size, value = 0, fillPercent = 0, onClick }) => {
    const svgSize = svgSizes[size];

    const partialFilledStar =
        fillPercent % 1 !== 0 ? (
            <div data-partial-star-wrapper="">
                <div data-filled="" data-rating-star="">
                    <SvgStarFill width={svgSize} />
                </div>
            </div>
        ) : null;

    if (onClick) {
        return (
            <button
                aria-label={`Rate ${value}`}
                data-filled={fillPercent === 1 ? '' : undefined}
                data-rating-star=""
                onClick={() => onClick(value)}
            >
                <SvgStarFill width={svgSize} />
            </button>
        );
    } else {
        return (
            <div data-filled={fillPercent === 1 ? '' : undefined} data-rating-star="">
                <SvgStarFill width={svgSize} />

                {partialFilledStar}
            </div>
        );
    }
};
