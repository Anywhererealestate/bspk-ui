/**
 * There are no barrel files for this repository.
 *
 * Components should be imported directly like "import { Txt } from
 *
 * @bspk/ui/Txt".
 */

import { JSXElementConstructor, ReactNode, ComponentPropsWithoutRef, AriaAttributes, HTMLAttributes } from 'react';

export type AlertVariant = 'error' | 'informational' | 'success' | 'warning';

export type SetRef<T> = (instance: T | null) => void;

/** Props for a component that renders a container element, allowing customization of the container element's attributes. */
export type ElementAttributes<
    /** HTML Element */
    E extends JSXElementConstructor<unknown> | keyof JSX.IntrinsicElements,
    /** Component Props to Omit */
    P extends Record<string, unknown>,
    /** Properties to Omit */
    O extends string = '',
> = P & {
    /**
     * Properties which allow customization of the container element's attributes. These include [standard HTML
     * attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes), [ARIA
     * attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes), and [custom
     * data attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes).
     *
     * @type ElementAttributes
     */
    attr?: Omit<AriaAttributes & ComponentPropsWithoutRef<E> & DataProps & HTMLAttributes<E>, O | keyof P>;
};

/** Properties that begin with "data-"" */
export type DataProps = Partial<{ [key: `data-${string}`]: unknown }>;

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
    /** Inline styles to apply to the element. */
    style?: React.CSSProperties;
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
     * This is a utility attribute used to identify the owning component of another component.
     *
     * This is used to identify the component in the UI library and is not intended for public use.
     *
     * @utility
     */
    owner?: string;
    /** The [ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) of the element. */
    role?: HTMLAttributes<HTMLElement>['role'];
    /**
     * The [tabIndex](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex) of the
     * element.
     */
    tabIndex?: HTMLAttributes<HTMLElement>['tabIndex'];
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
