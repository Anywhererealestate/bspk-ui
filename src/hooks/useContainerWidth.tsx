import { useState, useLayoutEffect } from 'react';
/**
 * A hook to get the width of a container element.
 *
 * @example
 *     import { useRef } from 'react';
 *     import { useContainerWidth } from '@bspk/ui/hooks/useContainerWidth';
 *     function Example() {
 *         const containerRef = useRef<HTMLDivElement>(null);
 *         const width = useContainerWidth(containerRef);
 *         return <div ref={containerRef}>Width: {width}px</div>;
 *     }
 *
 * @param ref - A ref to a container element.
 * @returns The width of the container element.
 */
export function useContainerWidth(ref: React.RefObject<HTMLDivElement>) {
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
