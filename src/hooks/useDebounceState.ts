import { SetStateAction, useState } from 'react';

import { useTimeout } from './useTimeout';

/**
 * A hook that debounces a state update, ensuring that the function is not called again until a specified delay
 *
 * @param defaultValue The initial value of the state
 * @param delay [1000] The delay (in ms) for the state to update
 * @returns A tuple containing the current state and a debounced setter function that updates the state after the
 *   specified delay
 */
export function useDebounceState<T>(defaultValue: T, delay = 1000) {
    const [state, setState] = useState<T>(defaultValue);
    const timeout = useTimeout();

    return [state, (nextState: SetStateAction<T>) => timeout.set(() => setState(nextState), delay)] as const;
}
