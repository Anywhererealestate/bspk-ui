/**
 * There are no barrel files for this repository.
 *
 * Components should be imported directly like "import { Txt } from @bspk/ui/Txt".
 */

import { ChangeEvent, MouseEvent as ReactMouseEvent, ComponentProps, JSXElementConstructor, ReactNode } from 'react';

export type AlertVariant = 'error' | 'informational' | 'success' | 'warning';

export type ElementProps<
    P extends Record<string, unknown>,
    E extends JSXElementConstructor<unknown> | keyof JSX.IntrinsicElements,
    O extends string = '',
> = Omit<ComponentProps<E>, O | keyof P> & P;

export type ButtonSize = 'large' | 'medium' | 'small' | 'x-small';

export type CallToActionButton = {
    /**
     * The label of the call to action button.
     *
     * @required
     */
    label: string;
    /**
     * The callback function for the call to action button.
     *
     * @type () => void
     * @required
     */
    onClick: () => void;
    /** The size of the call to action button. */
    size?: ButtonSize;
};

export type ToggleControlProps<T extends HTMLElement> = CommonProps<'aria-label' | 'disabled' | 'invalid' | 'name', T> &
    Required<CommonProps<'value'>> & {
        /**
         * Marks the control as checked.
         *
         * @default false
         */
        checked?: boolean;
        /**
         * The function to call when the control is checked or unchecked.
         *
         * @type (checked, Event) => void
         * @required
         */
        onChange: (checked: boolean, event: ChangeEvent<T>) => void;
    };

export type CommonProps<K extends keyof CommonPropsLibrary, T extends HTMLElement = HTMLElement> = Pick<
    CommonPropsLibrary<T>,
    K
>;

export type CommonPropsLibrary<T extends HTMLElement = HTMLElement> = {
    /** The id of the element. If not provided one will be generated. */
    id?: string;
    /**
     * Marks the element as active and displays active state theme.
     *
     * @default false
     */
    active?: boolean;
    /**
     * The content of the element.
     *
     * @required
     */
    children: ReactNode;
    /**
     * The size of the element.
     *
     * @default medium
     */
    size?: 'large' | 'medium' | 'small';
    /**
     * Determines if the element is [required](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required).
     *
     * @default false
     */
    required?: boolean;
    /**
     * Determines if the element is [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled).
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * Marks the element as invalid and displays error state theme.
     *
     * @default false
     */
    invalid?: boolean;
    /**
     * Determines if the element is [readonly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly).
     *
     * @default false
     */
    readOnly?: boolean;
    /**
     * The [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name) of the control.
     *
     * @required
     */
    name: string;
    /**
     * Marks the element as invalid and displays error message.
     *
     * When an element is invalid it must display an error message explaining why it is invalid.
     */
    errorMessage?: string;
    /**
     * The value of the control.
     *
     * @required
     */
    value?: string;
    /**
     * The aria-label for the element.
     *
     * @required
     */
    'aria-label': string;
    /**
     * The function to call when the element is clicked.
     *
     * @param event - The mouse event.
     * @returns Void
     */
    onClick?: (event: ReactMouseEvent<T, MouseEvent>) => void;
};

export type Brand =
    | 'anywhere'
    | 'better-homes-gardens'
    | 'cartus'
    | 'century-21'
    | 'coldwell-banker'
    | 'corcoran'
    | 'denali-boss'
    | 'era'
    | 'sothebys';

export const BRANDS: { title: string; slug: Brand }[] = [
    { title: 'Anywhere', slug: 'anywhere' },
    { title: 'Better Homes & Gardens', slug: 'better-homes-gardens' },
    { title: 'Cartus', slug: 'cartus' },
    { title: 'Century 21', slug: 'century-21' },
    { title: 'Coldwell Banker', slug: 'coldwell-banker' },
    { title: 'Corcoran', slug: 'corcoran' },
    { title: 'Denali Boss', slug: 'denali-boss' },
    { title: 'ERA', slug: 'era' },
    { title: "Sotheby's", slug: 'sothebys' },
] as const;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
