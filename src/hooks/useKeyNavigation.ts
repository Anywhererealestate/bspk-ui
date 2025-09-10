import { Dispatch, SetStateAction, useRef, useState, KeyboardEvent, useEffect } from 'react';
import { SetRef } from '-/types/common';
import { handleKeyDown } from '-/utils/handleKeyDown';
import { KeyboardEventCode } from '-/utils/keyboard';

type SetActiveElementId = Dispatch<SetStateAction<string | null>>;

/**
 * Custom hook to handle keyboard navigation for a list of elements.
 *
 * This hook provides functionality to navigate through elements using arrow keys and select an element with the Enter
 * or Space key, or onClick.
 */
export function useKeyNavigation(
    keysCallback: Partial<Record<KeyboardEventCode | '*', (event: KeyboardEvent) => void>> = {},
): {
    handleKeyDown: (event: KeyboardEvent) => KeyboardEventCode | '*' | null;
    activeElementId: string | null;
    setElements: SetRef<HTMLElement[] | undefined>;
    setActiveElementId: SetActiveElementId;
} {
    const elementsRef = useRef<HTMLElement[]>([]);
    const elements = elementsRef.current;

    const [activeElementId, setActiveElementId] = useState<string | null>(null);

    useEffect(() => {
        if (activeElementId) document.querySelector(`[id="${activeElementId}"]`)?.scrollIntoView({ block: 'nearest' });
    }, [activeElementId, elements]);

    const handleArrow =
        (increment: -1 | 1) =>
        (event: KeyboardEvent): void => {
            if (!elements.length) return;
            event.preventDefault();

            let currentElement = elements[0];
            if (activeElementId) currentElement = elements.find((el) => el.id === activeElementId) || elements[0];

            const activeIndex = elements.indexOf(currentElement);
            const nextindex = (activeIndex + increment + elements.length) % elements.length;
            setActiveElementId(elements[nextindex]?.id);
        };

    const handleSelect = () => {
        if (!elements.length) return;
        if (activeElementId) elements.find((el) => el.id === activeElementId)?.click();
    };

    return {
        setElements: (newElements: HTMLElement[] | undefined) => {
            elementsRef.current = newElements ? (Array.from(newElements) as HTMLElement[]) : [];
        },
        handleKeyDown: handleKeyDown({
            ...keysCallback,
            ArrowRight: handleArrow(1),
            ArrowDown: handleArrow(1),
            ArrowUp: handleArrow(-1),
            ArrowLeft: handleArrow(-1),
            Enter: handleSelect,
            Space: (event) => {
                handleSelect();
                if (activeElementId) event.preventDefault();
            },
        }),
        activeElementId,
        setActiveElementId,
    };
}
