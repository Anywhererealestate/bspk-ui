import { AriaAttributes, useId, useState } from 'react';

import { EVENT_KEY } from '-/utils/keyboard';
import { scrollElementIntoView } from '-/utils/scrollElementIntoView';

import { CommonProps, InvalidPropsLibrary } from '..';

import { useFloating, UseFloatingElements, UseFloatingProps } from './useFloating';

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

function useKeyDownNavigation(containerElement: HTMLElement, setShow: (show: boolean) => void, disabled?: boolean) {
    const [activeIndex, setActiveIndex] = useState(-1);

    const itemElements = Array.from(containerElement?.children || []) as HTMLElement[];
    const selectedId = itemElements[activeIndex]?.id;

    const onKeyDownCapture = (event: React.KeyboardEvent): boolean => {
        if (disabled) return false;

        if (event.key === EVENT_KEY.Tab || event.key === EVENT_KEY.Escape) {
            setShow(false);
            return true;
        }

        if (event.key !== EVENT_KEY.Enter && !event.key.startsWith('Arrow')) return false;

        if (event.key.startsWith('Arrow') && !containerElement) {
            event.preventDefault();
            setShow(true);
            setActiveIndex(0);
            return true;
        }

        if (!containerElement?.children.length) return false;

        event.preventDefault();

        if (event.key === EVENT_KEY.Enter && activeIndex !== -1) {
            itemElements[activeIndex].click();
            return true;
        }

        let next = 0;
        if (event.key === EVENT_KEY.ArrowUp || event.key === EVENT_KEY.ArrowLeft) next = activeIndex - 1;
        if (event.key === EVENT_KEY.ArrowDown || event.key === EVENT_KEY.ArrowRight) next = activeIndex + 1;
        if (next < 0) next = itemElements.length - 1;
        if (next >= itemElements.length) next = 0;

        itemElements.forEach((el, index) => {
            if (index === next) el.setAttribute('data-selected', 'true');
            else el.removeAttribute('data-selected');
        });

        scrollElementIntoView(itemElements[next], containerElement);
        setActiveIndex(next);

        return true;
    };

    return { onKeyDownCapture, selectedId, activeIndex };
}

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
}: UseComboboxProps): {
    activeIndex: number;
    menuProps: {
        'data-placement': string | undefined;
        id: string;
        role: 'listbox';
        style: React.CSSProperties;
        tabIndex: -1;
        onOutsideClick: () => void;
    };
    toggleProps: ToggleProps;
    closeMenu: () => void;
    isOpen: boolean;
    elements: UseFloatingElements;
} {
    const menuId = useId();

    const [show, setShow] = useState(false);

    const { floatingStyles, middlewareData, elements } = useFloating({
        placement,
        strategy: 'fixed',
        offsetOptions,
        refWidth,
        hide: !show,
    });

    const { onKeyDownCapture, activeIndex, selectedId } = useKeyDownNavigation(
        elements.floating as HTMLElement,
        setShow,
        disabled || readOnly,
    );

    return {
        activeIndex,
        menuProps: {
            'data-placement': middlewareData?.offset?.placement,
            id: menuId,
            role: 'listbox',
            style: floatingStyles,
            tabIndex: -1,
            onOutsideClick: () => setShow(false),
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
            onKeyDownCapture,
        },
        closeMenu: () => setShow(false),
        isOpen: show,
        elements,
    };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
