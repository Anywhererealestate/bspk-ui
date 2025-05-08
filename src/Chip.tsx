import { css } from '@emotion/react';
import { CSSProperties, ReactNode } from 'react';

import { CommonProps } from '.';

export type ChipProps = CommonProps<'disabled' | 'onClick'> & {
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
            css={style}
            data-chip=""
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

export const style = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: fit-content;
    height: var(--spacing-sizing-06);
    padding: 0 var(--spacing-sizing-02);
    font: var(--labels-small);
    color: var(--foreground-neutral-on-surface-variant-01);
    background-color: var(--surface-neutral-t1-base);
    border: 1px solid var(--stroke-neutral-low);
    border-radius: var(--radius-small);

    &:not([data-flat]) {
        box-shadow: var(--drop-shadow-raise);
    }

    &[data-variant='filter'] {
        cursor: pointer;
    }

    &[data-wrap] {
        height: auto;
    }

    &[data-disabled] {
        color: var(--foreground-neutral-disabled-on-surface);
        cursor: not-allowed;
        border-color: var(--stroke-neutral-disabled-light);
        background-image: 
    //

            linear-gradient(var(--interactions-disabled-opacity), var(--interactions-disabled-opacity)),
            linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
    }

    &:not([data-disabled]) {
        &:hover {
            background-image: 
    //

                linear-gradient(var(--interactions-neutral-hover-opacity), var(--interactions-neutral-hover-opacity)),
                linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
        }

        &:active {
            background-image: 
    //

                linear-gradient(var(--interactions-neutral-press-opacity), var(--interactions-neutral-press-opacity)),
                linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
        }

        &:focus {
            outline: 1px solid var(--stroke-neutral-focus);
            border-color: var(--stroke-neutral-focus);
        }
    }

    &[data-selected] {
        background-color: var(--surface-brand-primary-highlight);
        border-color: var(--stroke-brand-primary);
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
