import { useState, useEffect } from 'react';

/**
 * A custom hook to manage controlled and uncontrolled state.
 *
 * Allows a component to either be controlled by an external value or manage its own internal state. This is helpful for
 * components that should operate in both controlled and uncontrolled modes.
 */
export function useControlledState<V>(
    externalValue: V | undefined,
    changeCallBack?: (newValue: V) => void,
): [V, (newValue: V) => void] {
    const [value, setValue] = useState<V | undefined>(externalValue);
    useEffect(() => setValue(externalValue), [externalValue]);

    const onChange = (newValue: V) => {
        setValue(newValue);
        changeCallBack?.(newValue);
    };

    return [value as V, onChange];
}
