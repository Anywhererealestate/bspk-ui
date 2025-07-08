/**
 * There are no barrel files for this repository.
 *
 * Components should be imported directly like "import { Txt } from
 *
 * @bspk/ui/Txt".
 */

import { JSXElementConstructor, ReactNode, ComponentPropsWithoutRef } from 'react';

export const BRANDS: {
    /** The title of the brand. */
    title: string;
    /** The slug of the brand, used in URLs and identifiers. */
    slug: Brand;
}[] = [
    {
        title: 'Anywhere',
        slug: 'anywhere',
    },
    {
        title: 'Better Homes & Gardens',
        slug: 'better-homes-gardens',
    },
    {
        title: 'Cartus',
        slug: 'cartus',
    },
    {
        title: 'Century 21',
        slug: 'century-21',
    },
    {
        title: 'Coldwell Banker',
        slug: 'coldwell-banker',
    },
    {
        title: 'Corcoran',
        slug: 'corcoran',
    },
    {
        title: 'Denali Boss',
        slug: 'denali-boss',
    },
    {
        title: 'ERA',
        slug: 'era',
    },
    {
        title: "Sotheby's",
        slug: 'sothebys',
    },
] as const;

export type AlertVariant = 'error' | 'informational' | 'success' | 'warning';

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

/**
 * The props that are common to input elements.
 *
 * If an element is invalid it must have an errorMessage.
 */
export type InvalidPropsLibrary = {
    /**
     * Marks the element as invalid and displays error state theme.
     *
     * If the errorMessage is empty the error state theme will not appear.
     *
     * @default false
     */
    invalid?: boolean;
    /**
     * Marks the element as invalid and displays error message.
     *
     * When an element is invalid it must display an error message explaining why it is invalid.
     */
    errorMessage?: string;
};

export type InvalidProps<K extends keyof InvalidPropsLibrary> = Pick<InvalidPropsLibrary, K>;

export type CommonPropsLibrary = {
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
     * This is a utility attribute used to identify the owning component of another component.
     *
     * This is used to identify the component in the UI library and is not intended for public use.
     */
    'data-bspk-owner'?: string;
};

export type CommonProps<K extends keyof CommonPropsLibrary> = Pick<CommonPropsLibrary, K>;

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
