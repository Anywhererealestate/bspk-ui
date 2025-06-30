import './chip-utility.scss';
import { ReactNode, isValidElement } from 'react';

import { isValidIcon } from '@utils/children';

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
     *     Chip Label;
     */
    label?: string;
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
     * @type BspkIcon
     */
    trailingIcon?: ReactNode;
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
}: ChipUtilityProps) {
    return (
        <button
            data-bspk="chip-utility"
            data-disabled={disabled || undefined}
            data-flat={flat || undefined}
            data-selected={selected || undefined}
            onClick={disabled ? undefined : onClick}
        >
            {isValidIcon(leadingIcon) && isValidElement(leadingIcon) && (
                <span aria-hidden="true" data-chip-icon>
                    {leadingIcon}
                </span>
            )}
            {label}
            {isValidIcon(trailingIcon) && isValidElement(trailingIcon) && (
                <span aria-hidden="true" data-chip-icon>
                    {trailingIcon}
                </span>
            )}
        </button>
    );
}

ChipUtility.bspkName = 'ChipUtility';

export { ChipUtility };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
