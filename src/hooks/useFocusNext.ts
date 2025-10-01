import { useRef } from 'react';
import { useMutationObserver } from './useMutationObserver';

type ElementOrNull = HTMLElement | null | undefined;

/**
 * A hook that focuses the next element only after a mutation occurs on the target element.
 *
 * This is useful for focusing an element that is added to the DOM after a state change.
 */
export function useFocusNext({ target, defaultNext = null }: { target: ElementOrNull; defaultNext?: ElementOrNull }) {
    const focusNext = useRef<ElementOrNull>(defaultNext);

    const setFocusNext = (next: () => ElementOrNull) => (focusNext.current = next());

    useMutationObserver(
        target || null,
        () => {
            if (!focusNext.current) return;
            setTimeout(() => {
                if (!focusNext.current) return;

                focusNext.current?.focus({ preventScroll: true });
                focusNext.current = null;
            }, 1000);
        },
        {
            childList: true,
            subtree: true,
        },
    );

    return { setFocusNext };
}
