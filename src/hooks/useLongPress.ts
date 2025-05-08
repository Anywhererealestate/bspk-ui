import { ComponentProps, useRef } from 'react';

import { useTimeout } from './useTimeout';

export function useLongPress(callback: (pressCount: number) => void, ms: number = 2000, isDisabled = false) {
    const longPressTimeout = useTimeout();
    const longPressCount = useRef(1);
    const duration = useRef(ms);

    const stop = () => {
        longPressCount.current = 1;
        duration.current = ms;
        longPressTimeout.clear();
    };

    const start = () => {
        duration.current /= 2;
        longPressTimeout.set(
            () => {
                callback(longPressCount.current);
                longPressCount.current += 1;
                start();
            },
            //
            Math.max(duration.current, 100),
        );
    };

    const buttonProps: ComponentProps<'button'> = {
        onMouseDown: (event) => {
            event.preventDefault();
            if (isDisabled) return;

            callback(longPressCount.current);
            start();
        },
        onMouseMove: (event) => {
            event.preventDefault();
            if (event.movementX > 100 || event.movementY > 100) stop();
        },
        onMouseLeave: () => stop(),
        onMouseUp: () => stop(),
    };

    return {
        start,
        stop,
        buttonProps,
        timeout: longPressTimeout,
    };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
