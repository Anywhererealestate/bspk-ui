import { DOMAttributes, useState } from 'react';
import { useOutsideClick } from './useOutsideClick';
import { handleKeyDown } from '-/utils/handleKeyDown';

export type UseKeyNavigationProps = {
    /**
     * The elements to navigate through using the keyboard.
     *
     * Can be an array of HTMLElements or a string selector to find elements within the container.
     *
     * If not provided, the hook will use the children of the container element.
     */
    elements: HTMLElement[];
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
    elements,
}: UseKeyNavigationProps): {
    keyNavProps: DOMAttributes<T>;
} {
    const [activeElement, setActiveElementState] = useState<HTMLElement | null>(elements[0] || null);

    const setActiveElement = (nextElement: HTMLElement | null) => {
        elements.forEach((element) => {
            const isActive = !!nextElement && (element.contains(nextElement) || element.id === nextElement?.id);
            element.toggleAttribute('data-active', isActive);
            if (isActive) setActiveElementState(nextElement);
        });
    };

    useOutsideClick({
        elements,
        callback: () => {
            setActiveElement(null);
        },
    });

    if (!elements.length) return { keyNavProps: {} };

    const handleIncrement = (increment: -1 | 1) => (): void => {
        if (!activeElement) {
            setActiveElement(elements[0]);
            return;
        }

        const activeIndex = elements.indexOf(activeElement);
        const nextindex = (activeIndex + increment + elements.length) % elements.length;
        setActiveElement(elements[nextindex]);
    };

    const handleSelect = () => () => {
        if (activeElement) onSelect(activeElement.id);
    };

    return {
        keyNavProps: {
            onFocus: () => {
                if (!activeElement) setActiveElement(elements[0]);
            },
            onMouseOverCapture: (e) => {
                setActiveElement(e.target as HTMLElement);
            },
            onMouseLeave: () => setActiveElement(null),
            onClick: (e) => {
                const targetElement = e.target as HTMLElement;
                const foundElement = elements.find((el) => el.contains(targetElement) || el.isEqualNode(targetElement));
                if (foundElement) {
                    setActiveElement(foundElement);
                    onSelect(foundElement.id);
                }
            },
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
    };
}
