/* eslint-disable react/no-multi-comp */
import { SvgStarFill } from '@bspk/icons/StarFill';
import { FC, ReactNode, useMemo } from 'react';
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

const ClickableStar: FC<{ children: ReactNode; onClick: () => void }> = ({ children, ...restProps }) => (
    <button {...restProps} aria-label="" data-rating-star="">
        {children}
    </button>
);

export const RatingStar: FC<RatingStarProps> = ({ size, value = 0, fillPercent = 0, onClick }) => {
    const svgSize = svgSizes[size];
    const svg = useMemo(() => <SvgStarFill width={svgSize} />, [svgSize]);
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
            <ClickableStar data-filled={fillPercent === 1 ? '' : undefined} onClick={() => onClick(value)}>
                {svg}
            </ClickableStar>
        );
    } else {
        return (
            <div data-filled={fillPercent === 1 ? '' : undefined} data-rating-star="">
                {svg}
                {partialFilledStar}
            </div>
        );
    }
};
