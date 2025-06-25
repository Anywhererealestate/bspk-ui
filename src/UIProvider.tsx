import { useState, ReactNode } from 'react';

import { useEventListener } from './hooks/useAddEventListener';
import { useDebounceState } from './hooks/useDebounceState';
import { useIsomorphicEffect } from './hooks/useIsomorphicEffect';
import { UIContext, ColorTheme } from './utils/uiContext';

export const UIProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<ColorTheme>('light');
    const [deviceWidth, setDeviceWidth] = useDebounceState(() => {
        // Initialize device width based on window size
        if (typeof window !== 'undefined') {
            return window.innerWidth;
        }
        return 0; // Default to 0 if window is not available (e.g., during SSR)
    }, 250);

    useIsomorphicEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
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
};
