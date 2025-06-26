import { useIsomorphicEffect } from './useIsomorphicEffect';

/**
 * A custom hook to lock the body scroll. This is particularly useful when displaying modals or overlays.
 *
 * This hook ensures the body width does not change when the scrollbar is hidden, preventing content shift.
 *
 * @param lock - A boolean indicating whether to lock the body scroll or not.
 */
export const useLockBodyScroll = (lock?: boolean) => {
    useIsomorphicEffect(() => {
        if (lock) {
            // Calculate the scrollbar width to prevent content shift
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            // Apply styles to prevent scrolling and maintain width
            document.documentElement.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            // Reset styles to allow scrolling
            document.documentElement.style.overflow = '';
            document.body.style.paddingRight = '';
        }

        // Cleanup function to ensure styles are reset on component unmount
        return () => {
            // Reset styles to allow scrolling
            document.documentElement.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [lock]); // Re-run effect when isModalOpen changes
};
