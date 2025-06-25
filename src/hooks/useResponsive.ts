import { useDebounceState } from './useDebounceState';
import { useIsomorphicEffect } from './useIsomorphicEffect';

export function useResponsive() {
    const [deviceWidth, setDeviceWidth] = useDebounceState(0, window.innerWidth);

    const updateWidth = () => setDeviceWidth(window.innerWidth);

    useIsomorphicEffect(() => {
        updateWidth();
        window.addEventListener('resize', updateWidth);

        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    });

    return {
        isMobile: deviceWidth < 640,
        isTablet: deviceWidth > 640 && deviceWidth < 1024,
        isDesktop: deviceWidth >= 1024,
    };
}
