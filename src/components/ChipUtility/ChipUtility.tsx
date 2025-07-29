import { ReactNode, isValidElement } from 'react';

import { Badge, BadgeProps } from '-/components/Badge';
import { isValidIcon } from '-/utils/children';

import './chip-utility.scss';

export type BadgeItem = Pick<BadgeProps, 'count' | 'size' | 'surfaceBorder' | 'variant'>;

export type ChipUtilityProps = {
    /**
     * Is the chip disabled.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * Is the chip elevated or flat. If flat the drop shadow is removed.
     *
     * @default false
     */
    flat?: boolean;
    /**
     * The label of the chip.
     *
     * @example
     *     'Hello I am Chip';
     *
     * @required
     */
    label: string;
    /** The function to call when the chip is clicked. */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    /**
     * Whether the chip is currently selected.
     *
     * @default false
     */
    selected?: boolean;
    /**
     * The leading icon of the chip.
     *
     * @type BspkIcon
     */
    leadingIcon?: ReactNode;
    /**
     * The trailing icon of the chip.
     *
     * You can only have one of the trailing options, trailingIcon **or** trailingBadge. If both are present the
     * trailingIcon will be visible.
     *
     * @type BspkIcon
     */
    trailingIcon?: ReactNode;
    /**
     * The trailing Badge for use in the ChipFilter.
     *
     * If a trailingIcon is provided the Badge will **not** be visible.
     */
    trailingBadge?: BadgeItem;
};

/**
 * Dynamically generated options that are suggested to the user as responses or prompts.
 *
 * @example
 *     import { ChipUtility } from '@bspk/ui/ChipUtility';
 *
 *     function Example() {
 *         return (
 *             <Chip label="Label" onClick={() => console.log('Chip clicked!')}>
 *                 Example Chip
 *             </Chip>
 *         );
 *     }
 *
 * @name ChipUtility
 * @phase Utility
 */
function ChipUtility({
    flat = false,
    disabled = false,
    label,
    selected = false,
    leadingIcon,
    onClick,
    trailingIcon,
    trailingBadge,
}: ChipUtilityProps) {
    return (
        <button
            data-bspk="chip-utility"
            data-disabled={disabled || undefined}
            data-flat={flat || undefined}
            data-selected={selected || undefined}
            data-touch-target-parent
            disabled={disabled}
            onClick={disabled ? undefined : onClick}
        >
            <>
                {isValidIcon(leadingIcon) && isValidElement(leadingIcon) && (
                    <span aria-hidden="true" data-chip-icon>
                        {leadingIcon}
                    </span>
                )}
                <span>{label}</span>
                {isValidIcon(trailingIcon) && isValidElement(trailingIcon) && (
                    <span aria-hidden="true" data-chip-icon>
                        {trailingIcon}
                    </span>
                )}
                {trailingBadge && !trailingIcon && (
                    <Badge
                        count={trailingBadge.count}
                        size={trailingBadge.size}
                        surfaceBorder={trailingBadge.surfaceBorder}
                        variant={trailingBadge.variant}
                    />
                )}
            </>
            <span data-touch-target />
        </button>
    );
}

ChipUtility.bspkName = 'ChipUtility';

export { ChipUtility };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
