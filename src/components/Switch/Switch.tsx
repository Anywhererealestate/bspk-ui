import './switch.scss';
import { ChangeEvent } from 'react';
import { CommonProps } from '-/types/common';

export type SwitchProps = CommonProps<'aria-label' | 'disabled' | 'name' | 'value'> & {
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
    /**
     * Only exists as a alias for `disabled` and to match other input properties.
     *
     * @default false
     */
    readOnly?: boolean;
};

/**
 * A control element that allows users to toggle between two states, typically representing on/off and inherits
 * immediate reaction in each state. This is the base element and if used directly you must wrap it with a label. This
 * will more often be used in the SwitchOption component.
 *
 * @example
 *     import { useState } from 'react';
 *     import { Switch } from '@bspk/ui/Switch';
 *
 *     function Example() {
 *         const [isChecked, setIsChecked] = useState<boolean>(false);
 *
 *         return (
 *             <Switch
 *                 aria-label="Example aria-label"
 *                 name="example-name"
 *                 onChange={setIsChecked}
 *                 checked={isChecked}
 *             />
 *         );
 *     }
 *
 * @element
 *
 * @name Switch
 * @phase UXReview
 */
export function Switch({ checked = false, disabled: disabledProp = false, readOnly, ...props }: SwitchProps) {
    const disabled = readOnly || disabledProp;

    return (
        <span data-bspk="switch">
            <input
                {...props}
                aria-disabled={disabled || undefined}
                checked={!!checked}
                disabled={disabled || undefined}
                onChange={(event) => props.onChange(!!event.target.checked, event)}
                type="checkbox"
            />
            <span aria-hidden />
        </span>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
