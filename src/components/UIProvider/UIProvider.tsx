import { useState, ReactNode } from 'react';
import { AriaLiveMessageHandler, sendAriaLiveMessage } from './AriaLiveMessageHandler';
import { useDebounceState } from '-/hooks/useDebounceState';
import { useEventListener } from '-/hooks/useEventListener';
import { useIsomorphicEffect } from '-/hooks/useIsomorphicEffect';
import { UIContext, ColorTheme } from '-/utils/uiContext';

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
                sendAriaLiveMessage,
            }}
        >
            {children}
            <AriaLiveMessageHandler />
        </UIContext.Provider>
    );
}
