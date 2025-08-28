import { ChangeEvent } from 'react';

import { CommonProps, ElementAttributes } from '-/types/common';

import './radio.scss';

export type RadioProps = ElementAttributes<
    'input',
    CommonProps<'aria-label' | 'disabled' | 'invalid' | 'name'> &
        Required<CommonProps<'value'>> & {
            /**
             * Marks the radio as checked.
             *
             * @default false
             */
            checked?: boolean;
            /**
             * The function to call when the radio is checked.
             *
             * @required
             */
            onChange: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
        }
>;

/**
 * A round control that allows user to choose one option from a set. This is the base element and if used directly you
 * must wrap it with a label. This will more often be used in the RadioOption or RadioGroup component.
 *
 * @element
 *
 * @name Radio
 * @phase Utility
 */
export function Radio({
    'aria-label': ariaLabel,
    name,
    value,
    onChange,
    checked,
    disabled,
    attr,
    invalid,
}: RadioProps) {
    return (
        <span data-bspk="radio">
            <input
                {...attr}
                aria-label={ariaLabel}
                checked={!!checked}
                data-invalid={invalid || undefined}
                disabled={disabled || undefined}
                name={name}
                onChange={(event) => onChange(!!event.target.checked, event)}
                type="radio"
                value={value}
            />
            <span aria-hidden />
        </span>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
