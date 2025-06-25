import { useDebounceState } from './useDebounceState';
import { useIsomorphicEffect } from './useIsomorphicEffect';

export function useResponsive() {
    const [deviceWidth, setDeviceWidth] = useDebounceState(0, 250);

    useIsomorphicEffect(() => {
        // Add event listener for window resize
        window.addEventListener('resize', () => setDeviceWidth(window.innerWidth));

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', () => setDeviceWidth(window.innerWidth));
        };
    });

    return {
        isMobile: deviceWidth < 640,
        isTablet: deviceWidth > 640 && deviceWidth < 1024,
        isDesktop: deviceWidth >= 1024,
    };
}
