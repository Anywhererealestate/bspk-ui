import { css } from '@emotion/react';
import { ChangeEvent } from 'react';

import { CommonProps } from './';

export type SwitchProps = CommonProps<'aria-label' | 'disabled' | 'name' | 'onClick' | 'value'> & {
    /**
     * Marks the control as checked.
     *
     * @default false
     */
    checked?: boolean;
    /**
     * The function to call when the control is checked or unchecked.
     *
     * @type (checked, Event) => void
     * @required
     */
    onChange: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * A control element that allows users to toggle between two states, typically representing on/off and inherits
 * immediate reaction in each state. This is the base element and if used directly you must wrap it with a label. This
 * will more often be used in the SwitchOption or SwitchGroup component.
 *
 * @element
 *
 * @name Switch
 */
function Switch(props: SwitchProps) {
    const {
        //
        checked = false,
        disabled,
        ...otherProps
    } = props;

    return (
        <span css={style} data-switch>
            <input
                {...otherProps}
                aria-disabled={disabled || undefined}
                checked={checked}
                disabled={disabled || undefined}
                onChange={(event) => props.onChange(!!event.target.checked, event)}
                type="checkbox"
            />
            <span aria-hidden />
        </span>
    );
}

Switch.bspkName = 'Switch';

export { Switch };

export const style = css`
    --track-width: var(--spacing-sizing-09);
    --toggle-width: var(--spacing-sizing-04);
    --track-bg: var(--surface-neutral-t4-high);
    --toggle-bg: var(--foreground-neutral-on-color);

    display: block;
    position: relative;
    box-sizing: border-box;
    margin: 2px;

    input[type='checkbox'] {
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
        cursor: pointer;
    }

    box-sizing: border-box;
    width: var(--track-width);
    height: var(--spacing-sizing-05);
    border-radius: var(--spacing-sizing-05);
    background-color: var(--track-bg);
    position: relative;
    z-index: 1;

    span {
        display: block;
        width: var(--toggle-width);
        height: var(--toggle-width);
        border-radius: var(--radius-circular);
        background-color: var(--toggle-bg);
        transition: left 0.2s;
        box-shadow: var(--drop-shadow-raise);
        left: 2px;
        top: 2px;
        position: absolute;
    }

    &:has(input[type='checkbox']:checked) {
        --track-bg: var(--foreground-brand-primary);

        span {
            left: calc(var(--track-width) - var(--toggle-width) - 2px);
        }
    }

    &:has(input[type='checkbox']:disabled) {
        input[type='checkbox'] {
            pointer-events: none;
        }
        --track-bg: var(--interactions-disabled-opacity);
        --toggle-bg: var(--foreground-neutral-disabled-on-surface);

        &:has(input[type='checkbox']:checked) span {
            --toggle-bg: var(--foreground-neutral-disabled-on-color-surface);
        }
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
