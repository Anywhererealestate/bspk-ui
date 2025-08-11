import { CheckboxProps, Checkbox } from '-/components/Checkbox';
import { ToggleOption, ToggleOptionControlProps } from '-/components/ToggleOption';

export type CheckboxOptionProps = ToggleOptionControlProps<CheckboxProps>;

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
function CheckboxOption({ label: labelProp, description, disabled, ...checkboxProps }: CheckboxOptionProps) {
    const label = labelProp || description;
    const ariaLabel = description ? `${labelProp} - ${description}` : labelProp;
    return (
        label && (
            <ToggleOption data-bspk="checkbox-option" description={description} disabled={disabled} label={label}>
                <Checkbox {...checkboxProps} aria-label={ariaLabel} />
            </ToggleOption>
        )
    );
}

CheckboxOption.bspkName = 'CheckboxOption';

export { CheckboxOption };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
