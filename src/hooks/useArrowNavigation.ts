import { useState, KeyboardEvent, useEffect } from 'react';
import { getElementById } from '-/utils/dom';
import { KeysCallback } from '-/utils/handleKeyDown';
import { KeyboardEventCode } from '-/utils/keyboard';

type ArrowKeyNames = Extract<KeyboardEventCode, `Arrow${string}`>;

const ARROW_KEYS: ArrowKeyNames[] = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

export type ArrowKeyNavigationCallbackParams = {
    key: ArrowKeyNames;
    event: KeyboardEvent;
    activeElementId: string | null;
    increment: number;
};

type UseArrowNavigationProps = {
    /**
     * An array of string IDs representing the navigable elements. These IDs should correspond to the `id` attributes of
     * the elements in the DOM. Ensure the elements are not disabled.
     */
    ids: string[];
    /**
     * An optional callback function that is invoked when an arrow key is pressed. This function receives the key name,
     * the keyboard event, and the next active element ID. If the function returns `true`, the default navigation
     * behavior is prevented; if it returns `false` or is not provided, the default behavior proceeds.
     */
    callback?: (params: ArrowKeyNavigationCallbackParams) => boolean;
    /** Optional configuration to set navigation direction increments. */
    increments?: Record<ArrowKeyNames, number>;
    /**
     * The ID of the element that should be active by default. If not provided, the first ID in the `ids` array will be
     * used.
     */
    defaultActiveId?: string | null;
};

/**
 * A hook to manage arrow key navigation for a list of elements.
 *
 * @example
 *     const { activeElementId, setActiveElementId, arrowKeyCallbacks } = useArrowNavigation(['id1', 'id2', 'id3']);
 *
 * @returns An object containing:
 *
 *   - `activeElementId`: The ID of the currently active element.
 *   - `setActiveElementId`: A function to manually set the active element ID.
 *   - `arrowKeyCallbacks`: An object with callback functions for arrow key navigation.
 */
export function useArrowNavigation({
    ids = [],
    callback,
    increments = {
        ArrowLeft: -1,
        ArrowRight: 1,
        ArrowUp: -1,
        ArrowDown: 1,
    },
    defaultActiveId,
}: UseArrowNavigationProps): {
    activeElementId: string | null;
    setActiveElementId: (id: string | null) => void;
    arrowKeyCallbacks: KeysCallback;
} {
    const [activeElementId, setActiveElementIdBase] = useState<string | null>(defaultActiveId || null);

    useEffect(() => {
        // If the active element is not in the list, reset the first ID as active
        if (activeElementId && !ids.includes(activeElementId)) setActiveElementIdBase(ids[0]);
    }, [ids, activeElementId]);

    const setActiveElementId = (id: string | null) => {
        setActiveElementIdBase(id);
        getElementById(id)?.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth',
            inline: 'nearest',
        });
    };

    return {
        activeElementId,
        setActiveElementId,
        arrowKeyCallbacks: Object.fromEntries(
            ARROW_KEYS.map((key) => [
                key,
                (event: KeyboardEvent) => {
                    let nextIndex = 0;
                    let currentIndex = 0;
                    let nextId = ids[nextIndex];
                    const increment = increments[key];

                    if (activeElementId) {
                        currentIndex = ids.indexOf(activeElementId);
                        nextIndex = (currentIndex + increment + ids.length) % ids.length;
                        nextId = ids[nextIndex];
                    }

                    if (
                        typeof callback === 'function' &&
                        callback({ key, event, activeElementId: nextId, increment }) === false
                    )
                        return;
                    event.preventDefault();
                    setActiveElementId(nextId);
                },
            ]),
        ) as KeysCallback,
    };
}
