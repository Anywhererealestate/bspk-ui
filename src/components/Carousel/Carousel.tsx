import { SvgChevronLeft } from '@bspk/icons/ChevronLeft';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import React, { ReactNode, useMemo, useState } from 'react';
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
     * @default full
     */
    width?: '1/2' | '3/4' | 'full';
    /**
     * Whether to show a peak of the next item in the carousel.
     *
     * Ignored if width is '3/4' as it will always show a peak.
     *
     * @default false
     */
    peak?: boolean;
};

/**
 * A carousel component for displaying a horizontal list of items with navigation controls.
 *
 * @example
 *     import { Carousel } from '@bspk/ui/Carousel';
 *
 *     function Example() {
 *         return (
 *             <Carousel label="Example Carousel" width="1/2" peak>
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

export function Carousel({ label = 'carousel', children, width = 'full', peak = false }: CarouselProps) {
    const [current, setCurrentState] = useState(0);

    const { items, total } = useMemo(() => {
        const nextItems = React.Children.toArray(children);
        return {
            items: nextItems,
            total: nextItems.length,
        };
    }, [children]);

    const setCurrent = (dir: 'next' | 'prev') => () => {
        setCurrentState((prev) => {
            const next = Math.max(0, Math.min(total - 1, dir === 'next' ? prev + 1 : prev - 1));
            (containerRef.current?.children[next] as HTMLElement)?.focus();
            return next;
        });
    };

    const swipeProps = useSwipe(setCurrent('next'), setCurrent('prev'));

    const containerRef = React.useRef<HTMLDivElement | null>(null);

    return (
        <div
            aria-label={label}
            aria-roledescription="carousel"
            data-bspk="carousel"
            data-peak={peak || undefined}
            data-width={width || 'full'}
            role="region"
            style={cssWithVars({ '--current-slide': current })}
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
                        },
                    )}
                    ref={(node) => (containerRef.current = node)}
                >
                    {items.map((child, index) => (
                        <div
                            aria-label={`Slide ${index + 1} of ${total}`}
                            aria-roledescription="slide"
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
