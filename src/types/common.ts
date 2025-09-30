/**
 * There are no barrel files for this repository.
 *
 * Components should be imported directly like "import { Txt } from
 *
 * @bspk/ui/Txt".
 */

import { JSXElementConstructor, ReactNode, ComponentPropsWithoutRef, AriaRole } from 'react';

export type AlertVariant = 'error' | 'informational' | 'success' | 'warning';

/** Sets a ref to the given element. */
export type SetRef<T> = (instance: T | null) => void;

export type ElementProps<
    P extends Record<string, unknown>,
    E extends JSXElementConstructor<unknown> | keyof JSX.IntrinsicElements,
    O extends string = '',
> = Omit<ComponentPropsWithoutRef<E>, O | keyof P> & P;

export type ElementConstructorProps<
    E extends JSXElementConstructor<unknown> | keyof JSX.IntrinsicElements,
    O extends string = '',
> = Omit<ComponentPropsWithoutRef<E>, O>;

export type DataProps = Record<`data-${string}`, unknown>;

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
     * @required
     */
    onClick: () => void;
    /** The size of the call to action button. */
    size?: ButtonSize;
};

export type CommonPropsLibrary = {
    /**
     * Marks the element as invalid and displays error state theme.
     *
     * If the errorMessage is empty the error state theme will not appear.
     *
     * @default false
     */
    invalid?: boolean;
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
     * Identifies the parent component. Helps with styling, debugging, and/or testing purposes.
     *
     * @utility
     */
    owner?: string;
    /**
     * The ARIA role of the element.
     *
     * @type string
     */
    role?: AriaRole;
};

export type CommonProps<K extends keyof CommonPropsLibrary> = Pick<CommonPropsLibrary, K>;

export type RequiredCommonProps<K extends keyof CommonPropsLibrary> = Required<Pick<CommonPropsLibrary, K>>;

export type FormFieldControlProps = {
    /** The id of the control description. */
    'aria-describedby'?: string;
    /** The id of the error message */
    'aria-errormessage'?: string;
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

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
