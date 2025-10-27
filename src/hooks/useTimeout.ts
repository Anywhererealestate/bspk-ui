import { useRef, useEffect, useMemo } from 'react';

export type TimeoutHook = {
    clear: () => void;
    set: (callback: () => void, ms?: number) => void;
    ref: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
};

/**
 * A hook that creates a timeout that is automatically cleared when the component is unmounted.
 *
 * @example
 *     import { useTimeout } from '@bspk/ui/hooks/useTimeout';
 *     import { useEffect } from 'react';
 *
 *     function MyComponent() {
 *     const timeout = useTimeout();
 *
 *     const handleClick = () => {
 *     timeout.set(() => console.log('Timeout triggered'), 1000);
 *     };
 *
 *     return <Button onClick={handleClick}>Click here then check the console.</Button>;
 *     }
 *
 * @returns A ref object that can be used to store a timeout id.
 */
export function useTimeout(): TimeoutHook;
export function useTimeout(initialCallback: () => void, durationMs: number): TimeoutHook;
export function useTimeout(initialCallback?: () => void, durationMs = 1000): TimeoutHook {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (initialCallback) timeoutRef.current = setTimeout(initialCallback, durationMs);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- only run at mount
    }, []);

    return useMemo(
        () => ({
            clear: () => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            },
            set: (callback: () => void, ms = durationMs) => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(callback, ms);
            },
            ref: timeoutRef,
        }),
        [durationMs],
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
