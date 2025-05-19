import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgLink } from '@bspk/icons/Link';
import { SvgOpenInNew } from '@bspk/icons/OpenInNew';
import './link.scss';
import { AnchorHTMLAttributes } from 'react';

export type LinkProps = Pick<AnchorHTMLAttributes<unknown>, 'target'> & {
    /**
     * The label of the link.
     *
     * @required
     */
    label: string;
    /** The variant of the link. Controls the icon that is displayed and link target. */
    trailingIcon?: 'chevron' | 'external' | 'link';
    /** The [href](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#href) of the link. */
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
};

/**
 * This is the standalone link component. Inline links can use the native `a` element.
 *
 * @name Link
 */
function Link({ label, trailingIcon, size, variant, ...props }: LinkProps) {
    return (
        <a
            {...props}
            data-bspk="link"
            data-size={size}
            data-subtle={variant === 'subtle' || undefined}
            data-subtle-inverse={variant === 'subtle-inverse' || undefined}
            rel="noreferrer"
            target={trailingIcon === 'external' ? '_blank' : props.target}
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
