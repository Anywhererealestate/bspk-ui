import './radio-group-item.scss';
import { ChangeEvent } from 'react';
import { ElementProps, CommonProps } from '-/types/common';

export type RadioProps = CommonProps<'aria-label' | 'disabled' | 'invalid' | 'name'> &
    Required<CommonProps<'value'>> & {
        /**
         * Marks the radio-group-item as checked.
         *
         * @default false
         */
        checked?: boolean;
        /**
         * The function to call when the radio-group-item is checked.
         *
         * @required
         */
        onChange: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
    };

/**
 * A round control that allows user to choose one option from a set. This is the base element and if used directly you
 * must wrap it with a label. This will more often be used in the RadioOption or RadioGroup component.
 *
 * @name RadioGroupItem
 *
 * @phase Utility
 */
export function RadioGroupItem(props: ElementProps<RadioProps, 'input'>) {
    const { checked = false, invalid, disabled, onChange, ...otherProps } = props;

    return (
        <span data-bspk="radio-group-item">
            <input
                {...otherProps}
                checked={!!checked}
                data-invalid={invalid || undefined}
                disabled={disabled || undefined}
                onChange={(event) => onChange(!!event.target.checked, event)}
                type="radio-group-item"
            />
            <span aria-hidden />
        </span>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
