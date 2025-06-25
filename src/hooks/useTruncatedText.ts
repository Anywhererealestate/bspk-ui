import { useState } from 'react';

import { useMutationObserver } from './useMutationObserver';

/**
 * Custom hook to determine if a text element is truncated.
 *
 * @returns {{ isTruncated: boolean; setElement: (element: HTMLElement | null) => void }} -- An object containing
 *   `isTruncated` boolean and a function to set the element to observe.
 */
export function useTruncatedText(): { isTruncated: boolean; setElement: (element: HTMLElement | null) => void } {
    const [element, setElement] = useState<HTMLElement | null>(null);
    const [isTruncated, setIsTruncated] = useState<boolean>(false);

    useMutationObserver(element, () => {
        setIsTruncated(!!element && element.scrollWidth > element.clientWidth);
    });

    return { isTruncated, setElement };
}
