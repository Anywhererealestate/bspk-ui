import './chip.scss';
import { CSSProperties, ReactNode } from 'react';

import { CommonProps } from '.';

export type ChipProps = CommonProps<'disabled'> & {
    /**
     * The content of the chip.
     *
     * @required
     */
    children: ReactNode | string;
    /**
     * Whether the chip should wrap its content.
     *
     * (Not recommended)
     *
     * @default false
     */
    wrap?: boolean;
    /**
     * The variant of the chip.
     *
     * @default filter
     */
    variant?: 'filter';
    /**
     * Is the chip elevated or flat. If flat the drop shadow is removed.
     *
     * @default false
     */
    flat?: boolean;

    /**
     * Whether the chip is currently selected.
     *
     * @default false
     */
    selected?: boolean;
    /** The style of the chip. */
    style?: CSSProperties;
    /** The function to call when the chip is clicked. */
    onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
};

/**
 * Dynamically generated options that are suggested to the user as responses or prompts.
 *
 * @name Chip
 */
function Chip({
    children = '',
    wrap = false,
    variant = 'filter',
    flat = false,
    disabled = false,
    selected = false,
    onClick,
    style: styleProp,
}: ChipProps) {
    let additionalProps = {};

    if (variant === 'filter') {
        additionalProps = {
            onClick,
            role: 'button',
            tabIndex: 0,
        };
    }

    return (
        <span
            data-bspk="chip"
            data-disabled={disabled || undefined}
            data-flat={flat || undefined}
            data-selected={selected || undefined}
            data-variant={variant}
            data-wrap={wrap || undefined}
            style={styleProp}
            {...additionalProps}
        >
            {children}
        </span>
    );
}

Chip.bspkName = 'Chip';

export { Chip };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
