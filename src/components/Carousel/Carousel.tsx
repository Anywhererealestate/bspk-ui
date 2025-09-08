import './carousel.scss';
import { SvgChevronLeft } from '@bspk/icons/ChevronLeft';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { useRef, useState, useLayoutEffect } from 'react';
import { Button } from '-/components/Button';
import { PageControl } from '-/components/PageControl';
import { cssWithVars } from '-/utils/cwv';

function useContainerWidth(ref: React.RefObject<HTMLDivElement>) {
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        if (!ref.current) return;
        setWidth(ref.current.offsetWidth);

        const observer = new window.ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === ref.current) {
                    setWidth(entry.contentRect.width);
                }
            }
        });
        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref]);

    return width;
}

export type CarouselProps = {
    /**
     * The content of the carousel.
     *
     * @required
     */
    children: React.ReactNode[];

    itemWidth?: number;
    itemGap?: number;
    unitOfMeasure?: 'em' | 'px' | 'rem';
};

/**
 * A carousel component for displaying a horizontal list of items with navigation controls.
 *
 * @example
 *     import { Carousel } from '@bspk/ui/Carousel';
 *
 *     function Example() {
 *         return (
 *             <Carousel>
 *                 <div>child 1</div>
 *                 <div>child 2</div>
 *                 <div>child 3</div>
 *                 <div>child 4</div>
 *                 <div>child 5</div>
 *                 <div>child 6</div>
 *                 <div>child 7</div>
 *             </Carousel>
 *         );
 *     }
 *
 * @name Carousel
 * @phase Dev
 */
export function Carousel({ children, itemWidth = 180, itemGap = 24, unitOfMeasure = 'px' }: CarouselProps) {
    const [current, setCurrent] = useState(0);
    const total = children.length;
    const containerRef = useRef<HTMLDivElement>(null);
    const containerWidth = useContainerWidth(containerRef);

    // or a loading spinner
    // if (!containerWidth) return null;

    // Calculate max translate so last card is fully visible
    const maxTranslate = Math.max(0, (itemWidth + itemGap) * (total - 1) - (containerWidth - itemWidth));
    const safeCurrent = Math.min(current, total - 1);

    // Center the card if possible, otherwise keep last card fully visible
    const idealTranslate = safeCurrent * (itemWidth + itemGap) - (containerWidth - itemWidth) / 2;
    const translateX = Math.max(0, Math.min(idealTranslate, maxTranslate));

    const goTo = (idx: number) => setCurrent(Math.max(0, Math.min(idx, total - 1)));
    const prev = () => goTo(safeCurrent - 1);
    const next = () => goTo(safeCurrent + 1);

    return (
        <div
            data-bspk="carousel"
            style={cssWithVars({
                '--item-width': `${itemWidth}${unitOfMeasure}`,
                '--item-gap': `${itemGap}${unitOfMeasure}`,
                '--translate-x': `-${translateX}${unitOfMeasure}`,
            })}
        >
            <div data-items-container ref={containerRef}>
                <div data-items-track>
                    {children.map((child, idx) => (
                        <div data-item-wrapper key={idx}>
                            {child}
                        </div>
                    ))}
                </div>
            </div>
            <div data-controls>
                <Button
                    disabled={safeCurrent === 0}
                    icon={<SvgChevronLeft aria-hidden />}
                    iconOnly
                    label="Previous"
                    onClick={prev}
                    variant="tertiary"
                />
                <PageControl numPages={total} onChange={goTo} value={safeCurrent} />
                <Button
                    disabled={safeCurrent === total - 1}
                    icon={<SvgChevronRight aria-hidden />}
                    iconOnly
                    label="Next"
                    onClick={next}
                    variant="tertiary"
                />
            </div>
        </div>
    );
}
/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
