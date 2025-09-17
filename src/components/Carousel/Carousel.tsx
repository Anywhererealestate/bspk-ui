import { SvgChevronLeft } from '@bspk/icons/ChevronLeft';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { Children, CSSProperties, ReactNode, useMemo, useRef, useState } from 'react';
import { Button } from '-/components/Button';
import { PageControl } from '-/components/PageControl';
import { useSwipe } from '-/hooks/useSwipe';
import { cssWithVars } from '-/utils/cwv';
import { handleKeyDown } from '-/utils/handleKeyDown';

import './carousel.scss';

export type CarouselProps = {
    /**
     * A label for the carousel for screen readers.
     *
     * @required
     */
    label: string;
    /**
     * The content of the carousel.
     *
     * @required
     */
    children: ReactNode;
    /**
     * The width of each item relative to the carousel container's width.
     *
     * If number is provided, it is treated as pixels. If string is provided, it is treated as a CSS width value (%, px,
     * em, rem, etc).
     *
     * @default 80%
     *
     * @type string
     */
    itemWidth?: number | string;
    /**
     * The gap between items in pixels.
     *
     * @default 16
     */
    gap?: number;
    /** Additional styles to apply to the carousel container. */
    style?: CSSProperties;
};

/**
 * A carousel component for displaying a horizontal list of items with navigation controls.
 *
 * @example
 *     import { Carousel } from '@bspk/ui/Carousel';
 *
 *     function Example() {
 *         return (
 *             <Carousel label="Example Carousel" width="1/2">
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

export function Carousel({
    label = 'carousel',
    children,
    itemWidth: widthProp = '80%',
    gap: gapProp,
    style,
}: CarouselProps) {
    const gap = gapProp || 16;
    const widthValue = typeof widthProp === 'number' ? `${widthProp}px` : widthProp;

    const containerRef = useRef<HTMLDivElement | null>(null);

    const [current, setCurrentState] = useState(0);

    const { items, total } = useMemo(() => {
        const nextItems = Children.toArray(children);
        return {
            items: nextItems,
            total: nextItems.length,
        };
    }, [children]);

    const setCurrent = (dir: 'next' | 'prev') => () => {
        setCurrentState((prev) => {
            const nextVal = Math.max(0, Math.min(total - 1, dir === 'next' ? prev + 1 : prev - 1));
            const nextElement = containerRef.current?.children[nextVal] as HTMLElement | undefined;
            nextElement?.focus();
            nextElement?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            return nextVal;
        });
    };

    const swipeProps = useSwipe(setCurrent('next'), setCurrent('prev'));

    return (
        <div
            aria-label={label}
            aria-roledescription="carousel"
            data-bspk="carousel"
            role="region"
            style={cssWithVars({
                ...style,
                '--gap': gap ? `${gap}px` : 'var(--spacing-sizing-04)',
                '--item-width': widthValue,
            })}
        >
            <div data-items-container>
                <div
                    data-items-track
                    {...swipeProps}
                    onKeyDownCapture={handleKeyDown(
                        {
                            ArrowLeft: setCurrent('prev'),
                            ArrowRight: setCurrent('next'),
                        },
                        {
                            preventDefault: true,
                            stopPropagation: true,
                        },
                    )}
                    ref={(node) => (containerRef.current = node)}
                >
                    {items.map((child, index) => (
                        <div
                            aria-label={`Slide ${index + 1} of ${total}`}
                            aria-roledescription="slide"
                            data-active={current === index || undefined}
                            data-item-wrapper
                            key={index}
                            role="tabpanel"
                            tabIndex={current === index ? 0 : -1}
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
                    onClick={setCurrent('prev')}
                    variant="tertiary"
                />
                <PageControl numPages={total} value={current} />
                <Button
                    aria-label="Next Slide"
                    disabled={current === total - 1}
                    icon={<SvgChevronRight aria-hidden />}
                    iconOnly
                    label="Next"
                    onClick={setCurrent('next')}
                    variant="tertiary"
                />
            </div>
            <span aria-live="polite" data-sr-only>
                {`Slide ${current + 1} of ${total}`}
            </span>
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
