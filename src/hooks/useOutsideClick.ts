import { useEffect } from 'react';

/**
 * A hook which calls a method when a click occurs outside of the provided ref. Used inside the DropDown and Modal
 * components.
 *
 * @example
 *     import { useOutsideClick } from '@bspk/ui/hooks/useOutsideClick';
 *     import React, { useRef, useState } from 'react';
 *
 *     export function Example() {
 *     const [isOpen, setIsOpen] = useState(false);
 *     const containerRef = useRef<HTMLDivElement>(null);
 *
 *     useOutsideClick([containerRef.current], () => setIsOpen(false));
 *
 *     return (
 *     <>
 *     {isOpen && (
 *     <div className="custom-popup" ref={containerRef}>
 *     Content
 *     </div>
 *     )}
 *     </>
 *     );
 *     }
 *
 * @param elements - The elements to check if the click occurred outside of.
 * @param callback - The callback to call when a click occurs outside of the ref.
 * @param disabled - Whether the hook should be disabled. Defaults to false.
 */
export function useOutsideClick({
    elements,
    callback,
    disabled,
    handleTabs = false,
}: {
    elements: (HTMLElement | null)[] | null;
    callback: (event?: KeyboardEvent | MouseEvent) => void;
    disabled: boolean;
    handleTabs?: boolean;
}) {
    useEffect(() => {
        if (!elements?.length || disabled) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (disabled || elements?.some?.((element) => element?.contains?.(event.target as Node))) return;
            callback(event);
        };

        const handleOutsideTab = (event: KeyboardEvent) => {
            if (!handleTabs || event.key !== 'Tab' || disabled) return;

            setTimeout(() => {
                if (elements?.some?.((element) => element?.contains?.(document.activeElement))) return;
                callback(event);
            }, 0);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleOutsideTab);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleOutsideTab);
        };
    }, [callback, disabled, elements, handleTabs]);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
