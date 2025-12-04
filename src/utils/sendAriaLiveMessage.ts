/**
 * This utility function sends an ARIA live message to assistive technologies by dynamically creating a live region
 * element in the DOM.
 *
 * @param message The message to be announced by screen readers.
 * @param live The ARIA live attribute value, either 'assertive' or 'polite'. Defaults to 'polite'.
 */
export function sendAriaLiveMessage(message: string, live: 'assertive' | 'polite' = 'polite') {
    // remove existing AriaLiveMessage element from dom
    document.querySelectorAll('[data-bspk-aria-live]').forEach((el) => el.remove());

    // add new AriaLiveMessage element to dom
    document.body.insertAdjacentHTML(
        'beforeend',
        `<div data-bspk-aria-live aria-live=${live || 'polite'} data-sr-only role="alert">${message}</div>`,
    );
}
