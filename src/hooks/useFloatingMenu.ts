import { AriaAttributes, useId, useState } from 'react';

import { CommonProps, InvalidPropsLibrary } from '..';
import { EVENT_KEY } from '../utils/keyboard';

import { Placement, useFloating } from './useFloating';
import { useKeyboardNavigation } from './useKeyboardNavigation';
import { useOutsideClick } from './useOutsideClick';

export type UseFloatingMenuProps = {
    placement: Placement;
    triggerProps?: CommonProps<'disabled' | 'readOnly'> & InvalidPropsLibrary;
};

export type UseFloatingMenuReturn = {
    menuProps: {
        activeIndex: number;
        'data-placement': Placement | undefined;
        id: string;
        innerRef: (node: HTMLElement | null) => void;
        role: 'listbox';
        style: React.CSSProperties;
        tabIndex: number;
    };
    triggerProps: {
        'aria-activedescendant': string | undefined;
        'aria-controls': string;
        'aria-expanded': boolean;
        'aria-haspopup': AriaAttributes['aria-haspopup'];
        'aria-invalid': boolean | undefined;
        'aria-owns': string;
        'aria-readonly': boolean | undefined;
        'aria-errormessage': string | undefined;
        role: 'combobox';
        tabIndex: number;
        ref: (node: HTMLElement | null) => void;
        onClick: (event: React.MouseEvent) => void;
        onKeyDownCapture: (event: React.KeyboardEvent) => boolean;
    };
    closeMenu: () => void;
};

export function useFloatingMenu({ placement, triggerProps }: UseFloatingMenuProps): UseFloatingMenuReturn {
    const menuId = useId();

    const [show, setShow] = useState(false);
    const closeMenu = () => setShow(false);
    const openMenu = () => setShow(true);

    const { floatingStyles, middlewareData, elements } = useFloating({
        placement,
        strategy: 'fixed',
        offsetOptions: 4,
        refWidth: true,
        hide: !show,
    });

    const { handleKeyNavigation, selectedIndex: activeIndex, selectedId } = useKeyboardNavigation(elements.floating);

    useOutsideClick([elements.floating, elements.trigger], (event) => {
        event?.stopPropagation();
        if (!show) return;
        closeMenu();
    });

    return {
        menuProps: {
            activeIndex,
            'data-placement': middlewareData?.offset?.placement,
            id: menuId,
            innerRef: (node: HTMLElement | null) => {
                elements.setFloating(node);
            },
            role: 'listbox',
            style: floatingStyles,
            tabIndex: -1,
        },
        triggerProps: {
            'aria-errormessage': triggerProps?.errorMessage || undefined,
            'aria-activedescendant': selectedId || undefined,
            'aria-controls': menuId,
            'aria-expanded': show,
            'aria-haspopup': 'listbox' as AriaAttributes['aria-haspopup'],
            'aria-invalid': triggerProps?.invalid || undefined,
            'aria-owns': menuId,
            'aria-readonly': triggerProps?.readOnly || undefined,
            role: 'combobox',
            tabIndex: 0,
            ref: (node: HTMLElement | null) => elements.setTrigger(node),
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
    };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
