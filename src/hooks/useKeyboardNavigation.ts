import { useState } from 'react';

import { EVENT_KEY } from '../utils/keyboard';
import { scrollElementIntoView } from '../utils/scrollElementIntoView';

/**
 * This hook provides keyboard navigation for a list of elements. Used inside the Dropdown component.
 *
 * @example
 *     import { useRef } from 'react';
 *     import { useKeyboardNavigation } from '@bspk/ui/hooks/useKeyboardNavigation';
 *
 *     export function Example() {
 *     const containerRef = useRef<HTMLDivElement>(null);
 *     const { selectedIndex, setSelectedIndex, handleKeyNavigation } = useKeyboardNavigation(containerRef.current, () => true);
 *
 *     return (
 *     <div ref={containerRef} onKeyDown={handleKeyNavigation} tabIndex={0}>
 *     {items.map((item, index) => (
 *     <div key={index} data-selected={selectedIndex === index}>
 *     {item}
 *     </div>
 *     ))}
 *     </div>
 *     );
 *     }
 *
 * @param containerElement - The container element that holds the list of elements.
 * @param onNavigate - Fires when the user navigates through the list with Arrow keys. If the function returns false,
 *   the navigation will be prevented. For example, this is useful when you want to prevent navigation when a dropdown
 *   is closed.
 * @returns An object containing the selectedIndex, setSelectedIndex, and handleKeyNavigation function.
 */
export function useKeyboardNavigation(
    containerElement?: HTMLElement | null,
    // /**
    //  * Fires when the user navigates through the list with Arrow keys. If the function returns false, the navigation will
    //  * be prevented. This is useful when you want to prevent navigation when the dropdown is closed.
    //  *
    //  * @returns Boolean
    //  */
    // selectedIndex: number,
    // setSelectedIndex: (index: number) => void,
): {
    handleKeyNavigation: (event: KeyboardEvent) => boolean;
    selectedIndex: number;
    selectedId: string | undefined;
    setSelectedIndex: (index: number) => void;
} {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    if (!containerElement)
        return {
            handleKeyNavigation: () => false,
            selectedIndex,
            setSelectedIndex: () => {},
            selectedId: undefined,
        };

    const handleArrowKeyNavigation = (event: KeyboardEvent): boolean => {
        if (event.key !== EVENT_KEY.Enter && !event.key.startsWith('Arrow')) return false;

        event.preventDefault();

        if (!containerElement || !containerElement.children.length) return false;

        const itemElements = Array.from(containerElement?.children) as HTMLElement[];

        if (event.key === EVENT_KEY.Enter && selectedIndex !== -1) {
            itemElements[selectedIndex].click();
            return true;
        }

        let next = 0;
        if (event.key === EVENT_KEY.ArrowUp || event.key === EVENT_KEY.ArrowLeft) next = selectedIndex - 1;
        if (event.key === EVENT_KEY.ArrowDown || event.key === EVENT_KEY.ArrowRight) next = selectedIndex + 1;

        if (next < 0) next = itemElements.length - 1;
        if (next >= itemElements.length) next = 0;

        itemElements.forEach((el, index) => {
            if (index === next) el.setAttribute('data-selected', 'true');
            else el.removeAttribute('data-selected');
        });

        scrollElementIntoView(itemElements[next], containerElement);
        setSelectedIndex(next);
        return true;
    };

    return {
        handleKeyNavigation: handleArrowKeyNavigation,
        selectedIndex,
        selectedId: selectedIndex === -1 ? undefined : containerElement.children[selectedIndex]?.id,
        setSelectedIndex: setSelectedIndex,
    };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
