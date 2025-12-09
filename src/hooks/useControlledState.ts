import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * A custom hook to manage controlled and uncontrolled state.
 *
 * Allows a component to either be controlled by an external value or manage its own internal state. This is helpful for
 * components that should operate in both controlled and uncontrolled modes.
 */
export function useControlledState<T>(
    initialValue: T,
    controlledValue?: T,
    onChange?: (value: T) => void,
): [T, (value: T | ((prev: T) => T)) => void] {
    const [internalValue, setInternalValue] = useState(initialValue);

    const isControlled = controlledValue !== undefined;

    const stateRef = useRef<T>(initialValue);

    const controlledRef = useRef<T | undefined>(controlledValue);

    useEffect(() => {
        stateRef.current = internalValue;
    }, [internalValue]);

    useEffect(() => {
        controlledRef.current = controlledValue;
    }, [controlledValue]);

    return [
        isControlled ? controlledValue : internalValue,
        useCallback(
            (next: T | ((prev: T) => T)) => {
                // Determine previous value based on controlled or uncontrolled mode
                const prevValue = isControlled ? controlledRef.current! : stateRef.current;

                // Resolve next value
                const nextValue = typeof next === 'function' ? (next as (p: T) => T)(prevValue) : next;

                // Update internal state only if uncontrolled
                if (!isControlled) setInternalValue(nextValue);

                onChange?.(nextValue);
            },
            [isControlled, onChange, setInternalValue],
        ),
    ] as const;
}
