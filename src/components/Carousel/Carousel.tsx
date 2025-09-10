import './carousel.scss';
import { SvgChevronLeft } from '@bspk/icons/ChevronLeft';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import React, { ReactNode, useRef, useState, useLayoutEffect } from 'react';
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
    children: ReactNode;
    /**
     * The width of each item in the carousel without the unit of measure
     *
     * @required
     */
    itemWidth: number;
    /**
     * The gap between each item in the carousel without the unit of measure
     *
     * @required
     */
    itemGap: number;
    /**
     * The unit of measure for the item width and gap
     *
     * @default px
     */
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
 *             <Carousel unitOfMeasure="px">
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

export function Carousel({ children, itemWidth, itemGap, unitOfMeasure = 'px' }: CarouselProps) {
    const [current, setCurrent] = useState(0);
    const childrenArray = React.Children.toArray(children);
    const total = childrenArray.length;
    const containerRef = useRef<HTMLDivElement>(null);
    const containerWidth = useContainerWidth(containerRef);

    const slideLeft = Math.max(0, Math.min(current, total - 1)) * (itemWidth + itemGap);
    const maxScroll = Math.max(0, (itemWidth + itemGap) * total - containerWidth);
    const isLastSlide = current === total - 1;
    const translateX = isLastSlide ? maxScroll : Math.max(0, Math.min(slideLeft, maxScroll));

    const goTo = (idx: number) => {
        const safeIdx = Math.max(0, Math.min(idx, total - 1));
        setCurrent(safeIdx);
    };
    const prev = () => goTo(current - 1);
    const next = () => goTo(current + 1);

    // Create a ref map for tab elements
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

    return (
        <div
            aria-label="Carousel"
            aria-roledescription="carousel"
            data-bspk="carousel"
            role="region"
            style={cssWithVars({
                '--item-width': `${itemWidth}${unitOfMeasure}`,
                '--item-gap': `${itemGap}${unitOfMeasure}`,
                '--translate-x': `-${translateX}${unitOfMeasure}`,
            })}
        >
            <div data-items-container ref={containerRef}>
                <div
                    aria-label="carousel"
                    data-items-track
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowLeft') {
                            e.preventDefault();
                            prev();
                        }
                        if (e.key === 'ArrowRight') {
                            e.preventDefault();
                            next();
                        }
                    }}
                    role="tablist"
                    tabIndex={0}
                >
                    {childrenArray.map((child, idx) => (
                        <div
                            aria-hidden={current !== idx}
                            aria-label={`Slide ${idx + 1} of ${total}`}
                            aria-roledescription="slide"
                            data-item-wrapper
                            key={idx}
                            onFocus={() => setCurrent(idx)}
                            ref={(el) => (slideRefs.current[idx] = el)}
                            role="tab"
                            tabIndex={current === idx ? 0 : -1}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
            <div data-controls>
                <Button
                    aria-label="Previous Slide"
                    disabled={current === 0}
                    icon={<SvgChevronLeft aria-hidden />}
                    iconOnly
                    label="Previous"
                    onClick={prev}
                    variant="tertiary"
                />
                <PageControl numPages={total} onChange={goTo} value={current} />
                <Button
                    aria-label="Next Slide"
                    disabled={current === total - 1}
                    icon={<SvgChevronRight aria-hidden />}
                    iconOnly
                    label="Next"
                    onClick={next}
                    variant="tertiary"
                />
            </div>
            <span
                aria-live="polite"
                style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden',
                }}
            >
                {`Slide ${current + 1} of ${total}`}
            </span>
        </div>
    );
}
/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
