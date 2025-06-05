import './switch.scss';
import { ChangeEvent } from 'react';

import { CommonProps } from './';

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
 *     export function Example() {
 *         const [isChecked, setIsChecked] = useState<boolean>(false);
 *
 *         return (
 *             <Switch
 *                 aria-label="Example aria-label"
 *                 name="Example name"
 *                 onChange={setIsChecked}
 *                 checked={isChecked}
 *             />
 *         );
 *     }
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
        <span data-bspk="switch">
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

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
