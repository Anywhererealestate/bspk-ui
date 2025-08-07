import { Dispatch, DOMAttributes, SetStateAction, useEffect, useRef, useState } from 'react';
import { useOutsideClick } from './useOutsideClick';
import { handleKeyDown } from '-/utils/handleKeyDown';

export type UseKeyNavigationProps = {
    /** The callback function to call when a tab is selected (Enter or Space keys). */
    onSelect: (activeId?: string) => void;
};

/**
 * Custom hook to handle keyboard navigation for a list of elements.
 *
 * This hook provides functionality to navigate through elements using arrow keys and select an element with the Enter
 * or Space key, or onClick.
 */
export function useKeyNavigation<T extends HTMLElement = HTMLUListElement>({
    onSelect,
}: UseKeyNavigationProps): {
    keyNavigationProps: DOMAttributes<T>;
    activeElementId: string | null;
    setElements: (newElements: HTMLElement[]) => void;
    setActiveElementId: Dispatch<SetStateAction<string | null>>;
} {
    const elements = useRef<HTMLElement[]>([]);
    const setElements = (newElements: HTMLElement[]) => {
        elements.current = newElements;
    };

    const [activeElementId, setActiveElementId] = useState<string | null>(null);

    useOutsideClick({
        elements: elements.current,
        callback: () => setActiveElementId(null),
    });

    const handleIncrement = (increment: -1 | 1) => (): void => {
        let currentElement = elements.current[0];
        if (activeElementId)
            currentElement = elements.current.find((el) => el.id === activeElementId) || elements.current[0];

        const activeIndex = elements.current.indexOf(currentElement);
        const nextindex = (activeIndex + increment + elements.current.length) % elements.current.length;
        setActiveElementId(elements.current[nextindex].id);
    };

    const handleSelect = () => () => {
        if (activeElementId) onSelect(activeElementId);
    };

    return {
        setElements,
        keyNavigationProps: {
            onKeyDown: handleKeyDown(
                {
                    ArrowRight: handleIncrement(1),
                    ArrowDown: handleIncrement(1),
                    ArrowUp: handleIncrement(-1),
                    ArrowLeft: handleIncrement(-1),
                    Enter: handleSelect(),
                    Space: handleSelect(),
                },
                { preventDefault: true, stopPropagation: true },
            ),
        },
        activeElementId,
        setActiveElementId,
    };
}
