import './badge.scss';
import { tryIntParse } from './utils/tryIntPsrse';

export type BadgeProps = {
    /**
     * The content of the badge. If larger than 99, the badge will display '99+'. If null or undefined, the badge will
     * be hidden.
     *
     * @example
     *     5;
     *
     * @default 1
     *
     * @type number
     * @minimum 1
     */
    count?: number;
    /**
     * The size of the badge.
     *
     * @default small
     */
    size?: 'small' | 'x-small';
    /**
     * The color variant of the badge.
     *
     * @default primary
     */
    variant?: 'primary' | 'secondary';
    /**
     * Whether the badge should have a border that matches the surface color.
     *
     * @default false
     */
    surfaceBorder?: boolean;
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
 */
function Badge({ count: countProp, size = 'small', variant = 'primary', surfaceBorder }: BadgeProps) {
    const count: number | null = tryIntParse(countProp);

    return (
        count !== null && (
            <sup
                data-bspk="badge"
                data-size={size}
                data-surface-border={surfaceBorder || undefined}
                data-variant={variant}
            >
                {count > 99 ? '99+' : count}
            </sup>
        )
    );
}

Badge.bspkName = 'Badge';

export { Badge };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
