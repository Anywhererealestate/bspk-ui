import { useState } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useResponsive() {
    const [isMobile, setIsMobile] = useState(false);

    useIsomorphicLayoutEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        // Initial check
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return { isMobile };
}
