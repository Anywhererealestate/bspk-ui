/**
 * Scrolls the container to make the element visible.
 *
 * @param element -- The element to scroll into view.
 * @param container -- The container to scroll.
 */
export function scrollElementIntoView(element?: Element | null, container?: Element | null): void {
    if (!element || !container) return;

    const elementRect = element.getBoundingClientRect();

    const containerRect = container.getBoundingClientRect();

    if (elementRect.top < containerRect.top) {
        // Element is above the visible area
        container.scrollTop -= containerRect.top - elementRect.top;
    } else if (elementRect.bottom > containerRect.bottom) {
        // Element is below the visible area
        container.scrollTop += elementRect.bottom - containerRect.bottom;
    }

    if (elementRect.left < containerRect.left) {
        // Element is to the left of the visible area
        container.scrollLeft -= containerRect.left - elementRect.left;
    } else if (elementRect.right > containerRect.right) {
        // Element is to the right of the visible area
        container.scrollLeft += elementRect.right - containerRect.right;
    }
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
