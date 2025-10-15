import { useTimeout } from './useTimeout';

type Fn = (...args: unknown[]) => void;

/**
 * A hook that debounces a function call, ensuring that the function is not called again until a specified delay
 *
 * @param fn The original, non debounced function (You can pass any number of args to it)
 * @param delay [1000] The delay (in ms) for the function to return
 * @returns The debounced function, which will run only if the debounced function has not been called in the last
 *   (delay) ms
 */
export function useDebounceCallback(fn: Fn, delay = 1000): Fn {
    const timer = useTimeout();
    return (...args: unknown[]) => timer.set(() => fn(...args), delay);
}
