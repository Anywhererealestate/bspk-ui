import { AnchorHTMLAttributes, ComponentType, lazy, LazyExoticComponent, Suspense } from 'react';
import { CommonPropsLibrary, ElementProps } from '-/types/common';

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
     */
    target?: '_blank' | '_parent' | '_self' | '_top';
};

/**
 * This is the standalone link component. Inline links can use the native `a` element.
 *
 * @example
 *     import { Link } from '@bspk/ui/Link';
 *
 *     <Link href="https://anywhere.re" label="Example label" trailingIcon="external" />;
 *
 * @name Link
 * @phase Stable
 */
export function Link({ label, trailingIcon, size, variant, target = '_self', ...props }: ElementProps<LinkProps, 'a'>) {
    let LazyIcon: LazyExoticComponent<ComponentType<unknown>> | undefined = undefined;

    if (trailingIcon === 'external')
        LazyIcon = lazy(() => import('@bspk/icons/OpenInNew').then((module) => ({ default: module.SvgOpenInNew })));

    if (trailingIcon === 'chevron')
        LazyIcon = lazy(() =>
            import('@bspk/icons/ChevronRight').then((module) => ({ default: module.SvgChevronRight })),
        );

    if (trailingIcon === 'link')
        LazyIcon = lazy(() => import('@bspk/icons/Link').then((module) => ({ default: module.SvgLink })));

    return (
        <a
            {...props}
            data-bspk="link"
            data-size={size}
            data-subtle={variant === 'subtle' || undefined}
            data-subtle-inverse={variant === 'subtle-inverse' || undefined}
            data-trailing-icon={trailingIcon || undefined}
            target={trailingIcon === 'external' ? '_blank' : target}
        >
            <span>{label}</span>
            {LazyIcon && (
                <Suspense fallback={null}>
                    <LazyIcon />
                </Suspense>
            )}
        </a>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
