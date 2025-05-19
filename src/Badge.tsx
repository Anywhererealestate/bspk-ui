import './badge.scss';
import { tryIntParse } from './utils/tryIntPsrse';

export type BadgeProps = {
    /**
     * The content of the badge. If larger than 99, the badge will display '99+'. If null or undefined, the badge will
     * be hidden.
     *
     * @type number
     */
    count?: number | string | null | undefined;
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
};

/**
 * Visual indicator for new items within a parent page represented with a numerical count of new items.
 *
 * @name Badge
 */
function Badge({ count: countProp, size = 'small', variant = 'primary' }: BadgeProps) {
    const count: number | null = tryIntParse(countProp);

    return (
        count !== null && (
            <div data-bspk="badge" data-size={size} data-variant={variant}>
                {count > 99 ? '99+' : count}
            </div>
        )
    );
}

Badge.bspkName = 'Badge';

export { Badge };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
