import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgLink } from '@bspk/icons/Link';
import { SvgOpenInNew } from '@bspk/icons/OpenInNew';
import './link.scss';
import { AnchorHTMLAttributes } from 'react';

import { CommonPropsLibrary, ElementProps } from '.';

export type LinkProps = Pick<CommonPropsLibrary, 'disabled'> & {
    /**
     * The label of the link.
     *
     * @required
     */
    label: string;
    /** The variant of the link. Controls the icon that is displayed and link target. */
    trailingIcon?: 'chevron' | 'external' | 'link';
    /**
     * The [href](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#href) of the link.
     *
     * @example
     *     https://bspk.dev
     */
    href: AnchorHTMLAttributes<unknown>['href'];
    /**
     * The size of the link.
     *
     * @default base
     */
    size?: 'base' | 'large' | 'small';
    /**
     * Change the color of the link to a subtle color. This is useful for links that are not primary actions, for
     * example footer menus.
     *
     * @default default
     */
    variant?: 'default' | 'subtle-inverse' | 'subtle';
    /**
     * The [target](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#target) of the link. If the
     * `trailingIcon` is set to `external`, this will default to `_blank`.
     *
     * @default _self
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target
     */
    target?: '_blank' | '_parent' | '_self' | '_top';
};

/**
 * This is the standalone link component. Inline links can use the native `a` element.
 *
 * @example
 *     import { Link } from '@bspk/ui/Link';
 *
 *     export function Example() {
 *         return <Link href="https://bspk.dev" label="Example label" trailingIcon="external" />;
 *     }
 *
 * @name Link
 */
function Link({ label, trailingIcon, size, variant, target = '_self', ...props }: ElementProps<LinkProps, 'a'>) {
    return (
        <a
            {...props}
            data-bspk="link"
            data-size={size}
            data-subtle={variant === 'subtle' || undefined}
            data-subtle-inverse={variant === 'subtle-inverse' || undefined}
            target={trailingIcon === 'external' ? '_blank' : target}
        >
            <span>{label}</span>
            {trailingIcon === 'external' && <SvgOpenInNew />}
            {trailingIcon === 'chevron' && <SvgChevronRight />}
            {trailingIcon === 'link' && <SvgLink />}
        </a>
    );
}

Link.bspkName = 'Link';

export { Link };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
