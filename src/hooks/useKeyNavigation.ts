import { useState, KeyboardEvent, useEffect } from 'react';
import { handleKeyDown, KeysCallback } from '-/utils/handleKeyDown';
import { KeyboardEventCode } from '-/utils/keyboard';

type UseKeyNavigationProps = {
    overrides?: KeysCallback;
    defaultActiveElementId?: string | null;
    ids: string[];
};

/**
 * Custom hook to handle keyboard navigation for a list of elements.
 *
 * This hook provides functionality to navigate through elements using arrow keys and select an element with the Enter
 * or Space key, or onClick.
 */
export function useKeyNavigation({ overrides = {}, defaultActiveElementId, ids }: UseKeyNavigationProps): {
    handleKeyDown: (event: KeyboardEvent) => KeyboardEventCode | null;
    activeElementId: string | null;
    setActiveElementId: (nextId: string | null) => void;
} {
    const [activeElementId, setActiveElementId] = useState<string | null>(defaultActiveElementId || ids?.[0] || null);

    useEffect(() => {
        if (defaultActiveElementId) setActiveElementId(defaultActiveElementId);
    }, [defaultActiveElementId]);

    const handleArrow =
        (increment: -1 | 1) =>
        (event: KeyboardEvent): void => {
            if (!ids.length) return;
            event.preventDefault();
            const activeIndex = activeElementId ? ids.indexOf(activeElementId) : 0;
            const nextindex = (activeIndex + increment + ids.length) % ids.length;
            setActiveElementId(ids[nextindex]);

            const nextElement = document.querySelector<HTMLElement>(`[id="${activeElementId}"]`);
            if (nextElement)
                setTimeout(() => {
                    nextElement?.focus();
                    nextElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth', inline: 'nearest' });
                }, 100);
        };

    const handleSelect = () => {
        if (!ids.length) return;
        if (activeElementId) document.querySelector<HTMLElement>(`[id="${activeElementId}"]`)?.click();
    };

    return {
        handleKeyDown: handleKeyDown({
            ArrowRight: handleArrow(1),
            ArrowDown: handleArrow(1),
            ArrowUp: handleArrow(-1),
            ArrowLeft: handleArrow(-1),
            Enter: handleSelect,
            Space: (event) => {
                handleSelect();
                if (activeElementId) event.preventDefault();
            },
            ...overrides,
        }),
        activeElementId,
        setActiveElementId,
    };
}
