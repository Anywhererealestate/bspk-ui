import { AriaAttributes, useId, useState } from 'react';

import { CommonProps, InvalidPropsLibrary } from '..';
import { EVENT_KEY } from '../utils/keyboard';

import { useFloating, UseFloatingProps } from './useFloating';
import { useKeyboardNavigation } from './useKeyboardNavigation';
import { useOutsideClick } from './useOutsideClick';

export type UseComboboxProps = CommonProps<'disabled' | 'readOnly'> &
    InvalidPropsLibrary &
    Pick<UseFloatingProps, 'offsetOptions' | 'placement' | 'refWidth'>;

/**
 * Utility hook to manage a combobox component.
 *
 * It provides functionality for showing/hiding the menu, handling keyboard navigation, and managing ARIA attributes.
 *
 * @param {UseComboboxProps} props - The properties to configure the combobox.
 * @returns An object containing props for the menu and toggle elements, and a function to close the menu.
 */
export function useCombobox({
    placement = 'bottom',
    refWidth = true,
    disabled,
    errorMessage,
    invalid,
    readOnly,
    offsetOptions,
}: UseComboboxProps) {
    const menuId = useId();

    const [show, setShow] = useState(false);
    const closeMenu = () => setShow(false);
    const openMenu = () => setShow(true);

    const { floatingStyles, middlewareData, elements } = useFloating({
        placement,
        strategy: 'fixed',
        offsetOptions,
        refWidth,
        hide: !show,
    });

    const { handleKeyNavigation, selectedIndex: activeIndex, selectedId } = useKeyboardNavigation(elements.floating);

    useOutsideClick([elements.floating, elements.reference], (event) => {
        event?.stopPropagation();
        if (!show) return;
        closeMenu();
    });

    return {
        menuProps: {
            activeIndex,
            'data-placement': middlewareData?.offset?.placement,
            id: menuId,
            role: 'listbox',
            style: floatingStyles,
            tabIndex: -1,
        },
        toggleProps: {
            'aria-errormessage': errorMessage || undefined,
            'aria-activedescendant': selectedId || undefined,
            'aria-controls': menuId,
            'aria-disabled': disabled || undefined,
            'aria-expanded': show,
            'aria-haspopup': 'listbox' as AriaAttributes['aria-haspopup'],
            'aria-invalid': invalid || undefined,
            'aria-owns': menuId,
            'aria-readonly': readOnly || undefined,
            role: 'combobox',
            tabIndex: 0,
            onClick: () => {
                setShow((prev) => !prev);
            },
            /**
             * @param {React.KeyboardEvent} event
             * @returns {boolean} True if event was handled internally
             */
            onKeyDownCapture: (event: React.KeyboardEvent): boolean => {
                if (event.key === EVENT_KEY.Tab || event.key === EVENT_KEY.Escape) {
                    closeMenu();
                    return true;
                }

                openMenu();

                return handleKeyNavigation?.(event.nativeEvent);
            },
        },
        closeMenu,
        isOpen: show,
        elements,
    };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
