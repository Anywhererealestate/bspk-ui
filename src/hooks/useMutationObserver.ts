import { useEffect } from 'react';

/**
 * This hook allows you to observe mutations on a target element using the MutationObserver API.
 *
 * @param target {HTMLElement | null} The target element to observe for mutations.
 * @param callback {MutationCallback} The callback function to execute when mutations are observed.
 * @param options {MutationObserverInit} The options for the mutation observer.
 */
export function useMutationObserver(
    target: HTMLElement | null,
    callback: MutationCallback,
    options: MutationObserverInit = {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
    },
) {
    useEffect(() => {
        if (target) {
            const observer = new MutationObserver(callback);
            observer.observe(target, options);
            callback([], observer); // Initial call to set state based on current target state
            return () => observer.disconnect();
        }
        return () => null;
    }, [callback, options, target]);
}
