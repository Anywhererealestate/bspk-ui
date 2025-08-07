import { ChangeEvent } from 'react';

import { RadioProps, Radio } from '-/components/Radio';
import { ToggleOptionProps, ToggleOption } from '-/components/ToggleOption';
import { InvalidPropsLibrary } from '-/types/common';

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
function RadioOption({ label: labelProp, description, ...radioProps }: RadioOptionProps) {
    const label = labelProp || description;
    const ariaLabel = description ? `${labelProp} - ${description}` : labelProp;
    return (
        label && (
            <ToggleOption
                data-bspk="radio-option"
                description={description}
                disabled={radioProps.disabled}
                label={label}
            >
                <Radio {...radioProps} aria-label={ariaLabel} />
            </ToggleOption>
        )
    );
}

RadioOption.bspkName = 'RadioOption';

export { RadioOption };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
