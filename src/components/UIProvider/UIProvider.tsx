import { useState, ReactNode } from 'react';

import { useEventListener } from '-/hooks/useAddEventListener';
import { useDebounceState } from '-/hooks/useDebounceState';
import { useIsomorphicEffect } from '-/hooks/useIsomorphicEffect';
import { UIContext, ColorTheme } from '-/utils/uiContext';

export type UIProviderProps = {
    children: ReactNode;
};

/**
 * UIProvider is a React context provider that manages the UI state, including theme and responsive state.
 *
 * @name UIProvider
 */
function UIProvider({ children }: UIProviderProps) {
    const [theme, setTheme] = useState<ColorTheme>('light');

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
            value={{
                theme,
                setTheme,
                isMobile: deviceWidth < 640,
                isTablet: deviceWidth > 640 && deviceWidth < 1024,
                isDesktop: deviceWidth >= 1024,
            }}
        >
            {children}
        </UIContext.Provider>
    );
}

UIProvider.bspkName = 'UIProvider';

export { UIProvider };
