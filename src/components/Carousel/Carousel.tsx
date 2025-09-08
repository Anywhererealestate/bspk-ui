import './carousel.scss';
import { useRef, useState, useLayoutEffect } from 'react';
import { Button } from '-/components/Button';
import { PageControl } from '-/components/PageControl';

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

    className?: string;
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
export function Carousel({ children, className }: CarouselProps) {
    const [current, setCurrent] = useState(0);
    const total = children.length;
    const containerRef = useRef<HTMLDivElement>(null);
    const containerWidth = useContainerWidth(containerRef);

    // or a loading spinner
    // if (!containerWidth) return null;

    // Card and gap sizes
    const CARD_WIDTH = 180;
    const CARD_GAP = 32;

    // Calculate max translate so last card is fully visible
    const maxTranslate = Math.max(0, (CARD_WIDTH + CARD_GAP) * (total - 1) - (containerWidth - CARD_WIDTH));
    const safeCurrent = Math.min(current, total - 1);

    // Center the card if possible, otherwise keep last card fully visible
    const idealTranslate = safeCurrent * (CARD_WIDTH + CARD_GAP) - (containerWidth - CARD_WIDTH) / 2;
    const translateX = Math.max(0, Math.min(idealTranslate, maxTranslate));

    const goTo = (idx: number) => setCurrent(Math.max(0, Math.min(idx, total - 1)));
    const prev = () => goTo(safeCurrent - 1);
    const next = () => goTo(safeCurrent + 1);

    return (
        <div
            className={className}
            data-bspk="carousel"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                position: 'relative',
                background: '#fff',
            }}
        >
            <div
                ref={containerRef}
                style={{
                    width: '100%',
                    overflow: 'hidden',
                    minHeight: '200px',
                    margin: '2rem 0',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        gap: `${CARD_GAP}px`,
                        alignItems: 'center',
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: `translateX(-${translateX}px)`,
                    }}
                >
                    {children.map((child, idx) => (
                        <div
                            key={idx}
                            style={{
                                minWidth: `${CARD_WIDTH}px`,
                                minHeight: '180px',
                                background: idx === 0 ? '#f5e3ea' : idx === 1 ? '#f2e6fa' : '#e6e6fa',
                                opacity: idx === safeCurrent ? 1 : 0.5,
                                transform: `scale(${idx === safeCurrent ? 1 : 0.9})`,
                                transition: 'opacity 0.3s, transform 0.3s',
                                borderRadius: '8px',
                                boxShadow: idx === safeCurrent ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                            }}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <Button
                    disabled={safeCurrent === 0}
                    icon={<span aria-hidden>‹</span>}
                    iconOnly
                    label="Previous"
                    onClick={prev}
                    variant="tertiary"
                />
                <PageControl numPages={total} onChange={goTo} value={safeCurrent} />
                <Button
                    disabled={safeCurrent === total - 1}
                    icon={<span aria-hidden>›</span>}
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
