import { ElementType } from 'react';

import { TxtVariant } from './utils/txtVariants';

import { ElementProps } from './';

export type TxtProps<As extends ElementType = 'span'> = {
    /**
     * The element type to render as.
     *
     * @default span
     * @type ElementType
     */
    as?: As;
    /**
     * The content to render.
     *
     * @type string
     * @required
     */
    children: unknown;
    /**
     * The variant to use.
     *
     * @default body-base
     */
    variant?: TxtVariant;
    /** The id of the element. */
    id?: string;
};

/**
 * A text component that applies the correct font styles based on the variant and size. variant
 *
 * @example
 *     import { Txt } from '@bspk/ui/Txt';
 *
 *     export function Example() {
 *         return <Txt>Example Txt</Txt>;
 *     }
 *
 * @name Txt
 * @phase DesignReview

 */
function Txt<As extends ElementType = 'span'>({
    children,
    as,
    variant = 'body-base',
    style: styleProp,
    ...containerProps
}: ElementProps<TxtProps<As>, As>) {
    const content = children?.toString();

    if (!content) return null;

    const As: ElementType = as || 'span';

    return (
        <As {...containerProps} data-bspk="txt" style={{ ...styleProp, font: `var(--${variant})` }}>
            {content}
        </As>
    );
}

Txt.bspkName = 'Txt';

export { Txt };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
