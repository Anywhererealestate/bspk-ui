import { TouchEventHandler, useRef } from 'react';

const MIN_SWIPE_DISTANCE = 50; // Minimum distance for a swipe to be recognized

export function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
    const touchStart = useRef<number | null>(null);
    const touchEnd = useRef<number | null>(null);

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
        const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
        const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

        if (isLeftSwipe) {
            onSwipeLeft();
        } else if (isRightSwipe) {
            onSwipeRight();
        }
    };

    return { onTouchStart, onTouchMove, onTouchEnd };
}
