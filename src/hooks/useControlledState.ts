import { useState, useRef, useCallback } from 'react';

/**
 * A custom hook to manage controlled and uncontrolled state.
 *
 * Allows a component to either be controlled by an external value or manage its own internal state. This is helpful for
 * components that should operate in both controlled and uncontrolled modes.
 */
export function useControlledState<T>(
    initialValue: T,
    onChange?: (value: T) => void,
): [T, (value: T | ((prev: T) => T)) => void] {
    const [internalValue, setInternalValue] = useState(initialValue);

    const stateRef = useRef<T>(initialValue);

    return [
        internalValue,
        useCallback(
            (next: T | ((prev: T) => T)) => {
                const nextValue = typeof next === 'function' ? (next as (p: T) => T)(stateRef.current) : next;

                setInternalValue(nextValue);
                onChange?.(nextValue);

                stateRef.current = nextValue;
            },
            [onChange],
        ),
    ] as const;
}
