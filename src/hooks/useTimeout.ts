import { useRef, useEffect, useMemo } from 'react';

/**
 * A hook that creates a timeout that is automatically cleared when the component is unmounted.
 *
 * @example
 *     import { useTimeout } from '@bspk/ui/hooks/useTimeout';
 *     import { useEffect } from 'react';
 *
 *     function MyComponent() {
 *     const timeoutRef = useTimeout();
 *
 *     useEffect(() => {
 *     timeoutRef.current = setTimeout(() => {
 *     console.log('Timeout triggered');
 *     }, 1000);
 *     }, []);
 *     return <div>Check the console after 1 second</div>;
 *     }
 *
 * @returns A ref object that can be used to store a timeout id.
 */
export function useTimeout() {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    return useMemo(
        () => ({
            clear: () => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            },
            set: (callback: () => void, durationMs: number) => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(callback, durationMs);
            },
            ref: timeoutRef,
        }),
        [],
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
