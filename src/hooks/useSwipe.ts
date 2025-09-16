import { TouchEventHandler, useRef } from 'react';

export function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
    const touchStart = useRef<number | null>(null);
    const touchEnd = useRef<number | null>(null);

    const minSwipeDistance = 50; // Minimum distance for a swipe to be recognized

    const onTouchStart: TouchEventHandler = (e) => {
        touchEnd.current = null;
        touchStart.current = e.targetTouches[0].clientX;
    };

    const onTouchMove: TouchEventHandler = (e) => {
        touchEnd.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd: TouchEventHandler = () => {
        if (!touchStart.current || !touchEnd.current) return;
        const distance = touchStart.current - touchEnd.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            onSwipeLeft();
        } else if (isRightSwipe) {
            onSwipeRight();
        }
    };

    return { onTouchStart, onTouchMove, onTouchEnd };
}
