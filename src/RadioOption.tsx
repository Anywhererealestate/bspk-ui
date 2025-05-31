import { ChangeEvent } from 'react';

import { RadioProps, Radio } from './Radio';
import { ToggleOptionProps, ToggleOption } from './ToggleOption';

import { InvalidPropsLibrary } from '.';

export type RadioOptionProps = InvalidPropsLibrary &
    Pick<RadioProps, 'checked' | 'disabled' | 'name' | 'value'> &
    Pick<ToggleOptionProps, 'description' | 'label'> & {
        /**
         * The function to call when the radio is checked.
         *
         * @required
         */
        onChange: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
    };

/**
 * A control that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * @name RadioOption
 */
function RadioOption({ label, description, ...checkboxProps }: RadioOptionProps) {
    return (
        <ToggleOption data-bspk="radio-option" description={description} label={label}>
            <Radio {...checkboxProps} aria-label={label} />
        </ToggleOption>
    );
}

RadioOption.bspkName = 'RadioOption';

export { RadioOption };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
