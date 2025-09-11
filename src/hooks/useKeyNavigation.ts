import { Dispatch, SetStateAction, useRef, useState, KeyboardEvent, useEffect } from 'react';
import { SetRef } from '-/types/common';
import { handleKeyDown, KeysCallback } from '-/utils/handleKeyDown';
import { KeyboardEventCode } from '-/utils/keyboard';

type SetActiveElementId = Dispatch<SetStateAction<string | null>>;

/**
 * Custom hook to handle keyboard navigation for a list of elements.
 *
 * This hook provides functionality to navigate through elements using arrow keys and select an element with the Enter
 * or Space key, or onClick.
 */
export function useKeyNavigation(overrides: KeysCallback = {}): {
    handleKeyDown: (event: KeyboardEvent) => KeyboardEventCode | null;
    activeElementId: string | null;
    setElements: SetRef<HTMLElement[] | undefined>;
    setActiveElementId: SetActiveElementId;
} {
    const elementsRef = useRef<HTMLElement[]>([]);

    const [activeElementId, setActiveElementId] = useState<string | null>(null);

    useEffect(() => {
        if (activeElementId) document.querySelector(`[id="${activeElementId}"]`)?.scrollIntoView({ block: 'nearest' });
    }, [activeElementId]);

    const handleArrow =
        (increment: -1 | 1) =>
        (event: KeyboardEvent): void => {
            if (!elementsRef.current.length) return;
            event.preventDefault();

            let currentElement = elementsRef.current[0];
            if (activeElementId)
                currentElement = elementsRef.current.find((el) => el.id === activeElementId) || elementsRef.current[0];

            const activeIndex = elementsRef.current.indexOf(currentElement);
            const nextindex = (activeIndex + increment + elementsRef.current.length) % elementsRef.current.length;
            setActiveElementId(elementsRef.current[nextindex]?.id);
        };

    const handleSelect = () => {
        if (!elementsRef.current.length) return;
        if (activeElementId) elementsRef.current.find((el) => el.id === activeElementId)?.click();
    };

    return {
        setElements: (newElements: HTMLElement[] | undefined) => {
            elementsRef.current = newElements ? (Array.from(newElements) as HTMLElement[]) : [];
        },
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
