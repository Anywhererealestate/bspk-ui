import { useRef } from 'react';
import { useTimeout } from './useTimeout';

export type LongPressProps = {
    /** The callback to be invoked on long press. If false is returned, the repeating will stop. */
    callback: () => boolean;
    /**
     * The initial delay (in ms) before repeating starts. Default is 750ms.
     *
     * @default 750
     */
    delay?: number;
    /**
     * The amount (in percent) to decrement the delay after each repeat. Default is 15%.
     *
     * @default 15
     */
    delayDecrement?: number;
    /**
     * The minimum delay (in ms) between repeats. Default is 100ms.
     *
     * @default 100
     */
    delayMin?: number;
};

/**
 * A hook that provides long press functionality. The provided callback will be invoked once immediately on press, and
 * then repeatedly after a delay, with the delay decreasing by a specified amount after each repeat.
 */
export function useLongPress({
    callback,
    delay: initialDelay = 750,
    delayDecrement = 15,
    delayMin = 100,
}: LongPressProps) {
    const timeout = useTimeout();
    const isPressing = useRef(false);
    const delay = useRef(initialDelay);

    const setPressing = (pressing: boolean) => {
        isPressing.current = pressing;

        if (pressing) {
            if (!callback()) return setPressing(false);

            timeout.set(() => {
                if (!isPressing.current) return setPressing(false);

                const decrementMs = (delay.current * delayDecrement) / 100;
                delay.current = delay.current <= delayMin ? delayMin : delay.current - decrementMs;

                setPressing(true);
            }, delay.current);
            return;
        }

        delay.current = initialDelay;
        timeout.clear();
    };

    return {
        onPointerDown: () => setPressing(true),
        onPointerLeave: () => setPressing(false),
        onPointerUp: () => setPressing(false),
    };
}
