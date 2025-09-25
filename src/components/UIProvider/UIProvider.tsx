import { useState, ReactNode, useEffect } from 'react';

import { useEventListener } from '-/hooks/useAddEventListener';
import { useDebounceState } from '-/hooks/useDebounceState';
import { useIsomorphicEffect } from '-/hooks/useIsomorphicEffect';
import { useTimeout } from '-/hooks/useTimeout';
import { UIContext, ColorTheme, AriaLiveMessage } from '-/utils/uiContext';

export type UIProviderProps = {
    /**
     * The children elements that will have access to the UI context.
     *
     * @required
     */
    children: ReactNode;
};

/**
 * UIProvider is a React context provider that manages the UI state.
 *
 * UI state includes, theme, setTheme, responsive state, aria live messages
 *
 * This provider should wrap the root of your application to ensure that all components have access to the UI context.
 *
 * @name UIProvider
 *
 * @phase Utility
 */
export function UIProvider({ children }: UIProviderProps) {
    const [theme, setTheme] = useState<ColorTheme>('light');
    // Keep track of device width to determine if we are in mobile, tablet, or desktop mode

    const [deviceWidth, setDeviceWidth] = useDebounceState(() => {
        return typeof window !== 'undefined' ? window.innerWidth : 0;
    }, 250);

    useIsomorphicEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.setProperty(
            '--scrollbar-width',
            `${window.innerWidth - document.documentElement.clientWidth}px`,
        );
    }, [theme]);

    useEventListener('resize', () => setDeviceWidth(window.innerWidth));

    return (
        <UIContext.Provider
            data-bspk-utility="ui-provider"
            value={{
                theme,
                setTheme,
                isMobile: deviceWidth < 640,
                isTablet: deviceWidth > 640 && deviceWidth < 1024,
                isDesktop: deviceWidth >= 1024,
                sendAriaLiveMessage: (message, live) => {
                    document.dispatchEvent(new CustomEvent('aria-live', { detail: { message, live } }));
                },
            }}
        >
            {children}
            <AriaLiveMessageHandler />
        </UIContext.Provider>
    );
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
// eslint-disable-next-line react/no-multi-comp
function AriaLiveMessageHandler() {
    const [ariaLiveMessage, setAriaLiveMessage] = useState<AriaLiveMessage | undefined>(undefined);

    const timeout = useTimeout();

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.info('ARIA Live Message:', ariaLiveMessage);
    }, [ariaLiveMessage]);

    useEffect(() => {
        document.addEventListener('aria-live', (event: CustomEvent) => {
            const { message, live } = event.detail;
            // Clear any existing message to ensure that screen readers read the new message
            setAriaLiveMessage(undefined);
            timeout.set(() => setAriaLiveMessage({ message, live: live || 'polite' }), 100);
        });

        return () => {
            timeout.clear();
            document.removeEventListener('aria-live', (event: CustomEvent) => {
                const { message, live } = event.detail;
                setAriaLiveMessage({ message, live: live || 'polite' });
            });
        };
    }, [setAriaLiveMessage, timeout]);

    return (
        ariaLiveMessage && (
            <div aria-live={ariaLiveMessage?.live || 'polite'} data-sr-only role="alert">
                {ariaLiveMessage?.message}
            </div>
        )
    );
}
