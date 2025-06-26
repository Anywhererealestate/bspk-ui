import { AriaAttributes, useId, useState } from 'react';

import { CommonProps, InvalidPropsLibrary } from '..';
import { EVENT_KEY } from '../utils/keyboard';

import { useFloating, UseFloatingElements, UseFloatingProps } from './useFloating';
import { useKeyboardNavigation } from './useKeyboardNavigation';
import { useOutsideClick } from './useOutsideClick';

export type UseComboboxProps = CommonProps<'disabled' | 'readOnly'> &
    InvalidPropsLibrary &
    Pick<UseFloatingProps, 'offsetOptions' | 'placement' | 'refWidth'> & {
        /**
         * The element to use for outside click detection.
         *
         * If set to true, it will use the floating, and reference elements.
         *
         * If set to HTMLElements, it will use those element for outside click detection.
         *
         * If set to false, it will not use outside click detection.
         */
        refOutsideClick?: HTMLElement[] | boolean;
    };

export type ComboboxContext = ReturnType<typeof useCombobox>;
export type ToggleProps = {
    'aria-errormessage'?: string | undefined;
    'aria-activedescendant'?: string | undefined;
    'aria-controls': string;
    'aria-disabled'?: boolean | undefined;
    'aria-expanded': boolean;
    'aria-haspopup': AriaAttributes['aria-haspopup'];
    'aria-invalid'?: boolean | undefined;
    'aria-owns': string;
    'aria-readonly'?: boolean | undefined;
    role: 'combobox';
    tabIndex: number;
    onClick: () => void;
    onKeyDownCapture: (event: React.KeyboardEvent) => boolean;
};

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
    refOutsideClick = true,
}: UseComboboxProps): {
    menuProps: {
        activeIndex: number;
        'data-placement': string | undefined;
        id: string;
        role: 'listbox';
        style: React.CSSProperties;
        tabIndex: -1;
    };
    toggleProps: ToggleProps;
    closeMenu: () => void;
    isOpen: boolean;
    elements: UseFloatingElements;
} {
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

    useOutsideClick(
        refOutsideClick === true ? [elements.floating, elements.reference] : refOutsideClick || null,
        (event) => {
            event?.stopPropagation();
            if (!show) return;
            closeMenu();
        },
        !show || disabled || readOnly,
    );

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
