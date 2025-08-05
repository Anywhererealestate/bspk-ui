import { ChangeEvent } from 'react';

import { CheckboxProps, Checkbox } from '-/components/Checkbox';
import { ToggleOptionProps, ToggleOption } from '-/components/ToggleOption';
import { InvalidPropsLibrary } from '-/types/common';

export type CheckboxOptionProps = InvalidPropsLibrary &
    Pick<CheckboxProps, 'checked' | 'disabled' | 'indeterminate' | 'name' | 'value'> &
    Pick<ToggleOptionProps, 'description' | 'label'> & {
        /**
         * The function to call when the checkbox is checked or unchecked.
         *
         * @required
         */
        onChange: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
    };

/**
 * A control that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * If only a Checkbox is needed, consider using the Checkbox component directly.
 *
 * @example
 *     import { CheckboxOption } from '@bspk/ui/CheckboxOption';
 *
 *     function Example() {
 *         const [checked, setChecked] = React.useState(false);
 *         return (
 *             <CheckboxOption
 *                 checked={checked}
 *                 description="This is an example checkbox option."
 *                 label="Example Checkbox"
 *                 name="example-checkbox-name"
 *                 onChange={(nextChecked, event) => {
 *                     setChecked(nextChecked);
 *                     console.log('Checkbox changed:', nextChecked, event);
 *                 }}
 *                 value="example-checkbox-value"
 *             />
 *         );
 *     }
 *
 * @name CheckboxOption
 * @phase UXReview
 */
function CheckboxOption({ label: labelProp, description, ...checkboxProps }: CheckboxOptionProps) {
    const label = labelProp || description;
    return (
        label && (
            <ToggleOption
                data-bspk="checkbox-option"
                description={description}
                disabled={checkboxProps.disabled}
                label={label}
            >
                <Checkbox {...checkboxProps} aria-label={label} />
            </ToggleOption>
        )
    );
}

CheckboxOption.bspkName = 'CheckboxOption';

export { CheckboxOption };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
