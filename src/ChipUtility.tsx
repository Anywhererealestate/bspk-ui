import './chipUtility.scss';
import { Svg360 } from '@bspk/icons/360';
import {
    CSSProperties,
    ReactNode,
    // isValidElement
} from 'react';

import { isValidIcon } from './utils/children';

import { CommonProps } from '.';

export type ChipUtilityProps = CommonProps<'disabled'> & {
    /**
     * Is the chip elevated or flat. If flat the drop shadow is removed.
     *
     * @default false
     */
    flat?: boolean;

    label?: string;

    /**
     * Whether the chip is currently selected.
     *
     * @default false
     */
    selected?: boolean;
    /** The style of the chip. */
    style?: CSSProperties;
    /** The function to call when the chip is clicked. */
    // onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    /**
     * The icon of the button.
     *
     * @type BspkIcon
     */
    leadingIcon?: ReactNode;
    /**
     * The icon of the button.
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
 * @phase WorkInProgress
 */
function ChipUtility({
    // children = '',
    flat = false,
    disabled = false,
    label,
    selected = false,
    leadingIcon,
    // onClick,
    style: styleProp,
    trailingIcon,
}: ChipUtilityProps) {
    return (
        <span
            data-bspk="chip"
            data-disabled={disabled || undefined}
            data-flat={flat || undefined}
            data-selected={selected || undefined}
            // onClick={disabled ? undefined : onClick}
            style={styleProp}
        >
            {!!leadingIcon && isValidIcon(leadingIcon) && <span data-button-icon>{leadingIcon}</span>}
            <Svg360 />
            {label}
            {trailingIcon}
        </span>
    );
}

ChipUtility.bspkName = 'ChipUtility';

export { ChipUtility };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
