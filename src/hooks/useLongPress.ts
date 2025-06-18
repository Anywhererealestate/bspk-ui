import { useRef, useState } from 'react';

import { useTimeout } from './useTimeout';

export const MIN_INTERVAL = 250; // Minimum interval in milliseconds
export const INTERVAL_DECREASE_FACTOR = 0.75; // Percent by which the interval decreases each time
export const INITIAL_INTERVAL = 1000; // Initial interval in milliseconds

const isTriggerElementDisabled = (element: HTMLElement | null) =>
    !element ||
    (element as HTMLButtonElement).disabled ||
    element.getAttribute('disabled') === 'true' ||
    element.getAttribute('aria-disabled') === 'true' ||
    element.getAttribute('data-disabled') === 'true' ||
    !element.isConnected ||
    !element.offsetParent;

export function useLongPress(callback: () => void, disabled: boolean) {
    const timeout = useTimeout();
    const intervalRef = useRef(INITIAL_INTERVAL);

    const [triggerElement, setTriggerElement] = useState<HTMLButtonElement | null>(null);

    if (disabled)
        return {
            onMouseDown: () => {},
            onMouseUp: () => {},
            setTriggerElement: () => {},
        };

    const run = () => {
        // If the element is not connected or disabled, clear the timeout, and prevent the callback
        if (isTriggerElementDisabled(triggerElement)) return;
        callback();
        // Decrease the interval for the next call, but not below MIN_INTERVAL
        if (intervalRef.current > MIN_INTERVAL) intervalRef.current = intervalRef.current * INTERVAL_DECREASE_FACTOR;
        timeout.set(run, intervalRef.current);
    };

    return {
        onMouseDown: () => {
            intervalRef.current = INITIAL_INTERVAL;
            callback();
            timeout.set(run, intervalRef.current);
        },
        onMouseUp: () => {
            timeout.clear();
        },
        onMouseLeave: () => {
            timeout.clear();
        },
        setTriggerElement,
    };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
