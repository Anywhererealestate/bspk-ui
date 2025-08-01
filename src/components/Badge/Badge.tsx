import { ReactNode } from 'react';

import { tryIntParse } from '-/utils/tryIntPsrse';

import './badge.scss';

export type BadgeProps = {
    /**
     * The content of the badge. If larger than 99, the badge will display '99+'. If not a number the badge will be
     * hidden.
     *
     * @example
     *     5;
     *
     * @default 1
     *
     * @type number
     * @requires {variant: default}
     */
    count?: number;
    /**
     * Whether the badge is used for notifications and presented as a dot.
     *
     * @default default
     */
    variant?: 'default' | 'notification';
    /**
     * The size of the badge.
     *
     * @default small
     * @requires {variant: default}
     */
    size?: 'small' | 'x-small';
    /**
     * The color variant of the badge.
     *
     * @default primary
     */
    color?: 'primary' | 'secondary';
    /**
     * Whether the badge should have a border that matches the surface color.
     *
     * @default false
     * @requires {variant: default}
     */
    surfaceBorder?: boolean;
    /**
     * The context for which the badge is applied.
     *
     * Could be a button, link, or any other element that the badge is associated with.
     *
     * @type
     */
    children?: ReactNode;
};

/**
 * Visual indicator for new items within a parent page represented with a numerical count of new items.
 *
 * @example
 *     import { Badge } from '@bspk/ui/badge';
 *
 *     function Example() {
 *         return <Badge count={5} size="small" variant="primary" />;
 *     }
 *
 * @exampleDescription This example shows a badge with a count of 5, size small, and primary variant.
 *
 * @name Badge
 * @phase UXReview
 */
function Badge({
    count: countProp,
    size = 'small',
    variant = 'default',
    surfaceBorder,
    children,
    color = 'primary',
}: BadgeProps) {
    const count: number | null = tryIntParse(countProp);

    if (typeof count === 'undefined' && variant !== 'notification') return children || null;

    const badge =
        variant === 'notification' ? (
            <span data-bspk="badge" data-color={color} data-variant="notification" />
        ) : (
            <sup data-bspk="badge" data-color={color} data-size={size} data-surface-border={surfaceBorder || undefined}>
                {typeof count === 'number' && count > 99 ? '99+' : count}
            </sup>
        );

    if (children) {
        return (
            <span data-bspk="badge-wrapper">
                {children}
                {badge}
            </span>
        );
    }

    return badge;
}

Badge.bspkName = 'Badge';

export { Badge };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
