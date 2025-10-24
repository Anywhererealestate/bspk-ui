import './radio.scss';
import { ChangeEvent } from 'react';
import { ElementProps, FieldControlProps } from '-/types/common';

export type RadioProps = Omit<FieldControlProps<string, ChangeEvent<HTMLInputElement>>, 'onChange' | 'readOnly'> & {
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
};

/**
 * A round control that allows user to choose one option from a set. This is the base element and if used directly you
 * must wrap it with a label. This will more often be used in the RadioOption or RadioGroup component.
 *
 * @element
 *
 * @name Radio
 * @phase Utility
 */
export function Radio(props: ElementProps<RadioProps, 'input'>) {
    const { checked = false, invalid, disabled, onChange, ...otherProps } = props;

    return (
        <span data-bspk="radio">
            <input
                {...otherProps}
                checked={!!checked}
                data-invalid={invalid || undefined}
                disabled={disabled || undefined}
                onChange={(event) => onChange(!!event.target.checked, event)}
                type="radio"
            />
            {checked && (
                <span
                    aria-hidden
                    data-checked
                    data-checked-disabled={disabled || undefined}
                    data-checked-invalid={invalid || undefined}
                />
            )}
        </span>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
