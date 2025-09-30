import { useState } from 'react';
import { useEventListener } from '-/hooks/useAddEventListener';
import { useTimeout } from '-/hooks/useTimeout';
import { AriaLiveMessage } from '-/utils/uiContext';

export function sendAriaLiveMessage(message: string, live: 'assertive' | 'polite' = 'polite') {
    document.dispatchEvent(new CustomEvent('aria-live', { detail: { message, live } }));
}

/**
 * AriaLiveMessageHandler is a single use component that listens for aria-live messages and displays them to the user.
 *
 * We use a custom event to communicate between components and this handler.
 *
 * We don't store the message in context to avoid unnecessary re-renders of all components that consume the context. :)
 *
 * We queue messages to ensure that they are read by screen readers.
 *
 * After the message is read, we clear it after a short delay to allow for subsequent messages to be read.
 */
export function AriaLiveMessageHandler() {
    const [ariaLiveMessage, setAriaLiveMessage] = useState<AriaLiveMessage | undefined>(undefined);

    const timeout = useTimeout();

    useEventListener(
        'aria-live',
        (event: CustomEvent) => {
            const { message, live } = event.detail;
            // Clear any existing message to ensure that screen readers read the new message
            setAriaLiveMessage(undefined);
            timeout.set(() => setAriaLiveMessage({ message, live: live || 'polite' }), 10);
        },
        document,
    );

    return (
        ariaLiveMessage && (
            <div aria-live={ariaLiveMessage?.live || 'polite'} data-sr-only role="alert">
                {ariaLiveMessage?.message}
            </div>
        )
    );
}
