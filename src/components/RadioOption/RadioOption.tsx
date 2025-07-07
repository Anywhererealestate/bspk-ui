import { ChangeEvent } from 'react';

import { InvalidPropsLibrary } from '-';
import { RadioProps, Radio } from '-/components/Radio';
import { ToggleOptionProps, ToggleOption } from '-/components/ToggleOption';

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
 * If only a radio button is needed, consider using the Radio component directly.
 *
 * @name RadioOption
 * @phase Utility
 */
function RadioOption({ label: labelProp, description, ...checkboxProps }: RadioOptionProps) {
    const label = labelProp || description;
    return (
        label && (
            <ToggleOption data-bspk="radio-option" description={description} label={label}>
                <Radio {...checkboxProps} aria-label={label} />
            </ToggleOption>
        )
    );
}

RadioOption.bspkName = 'RadioOption';

export { RadioOption };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
