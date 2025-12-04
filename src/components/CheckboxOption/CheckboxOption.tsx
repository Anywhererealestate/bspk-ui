import { CheckboxProps, Checkbox } from '-/components/Checkbox';
import { ToggleOption, ToggleOptionControlProps } from '-/components/ToggleOption';
import { CommonProps } from '-/types/common';

export type CheckboxOptionProps = CommonProps<'style'> & ToggleOptionControlProps<CheckboxProps>;

/**
 * A control that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * If only a Checkbox is needed, consider using the Checkbox component directly.
 *
 * @example
 *     import { CheckboxOption } from '@bspk/ui/CheckboxOption';
 *
 *     () => {
 *         const [checked, setChecked] = useState(false);
 *
 *         return (
 *             <CheckboxOption
 *                 checked={checked}
 *                 description="This is an example checkbox option."
 *                 label="Example Checkbox"
 *                 name="example-checkbox-name"
 *                 onChange={(nextChecked, event) => {
 *                     setChecked(nextChecked);
 *                 }}
 *                 value="example-checkbox-value"
 *             />
 *         );
 *     };
 *
 * @name CheckboxOption
 * @phase Stable
 */
export function CheckboxOption({
    label: labelProp,
    description,
    disabled,
    style,
    ...checkboxProps
}: CheckboxOptionProps) {
    const label = labelProp || description;
    const ariaLabel = description ? `${labelProp} - ${description}` : labelProp;
    return (
        label && (
            <ToggleOption
                data-bspk="checkbox-option"
                description={description}
                disabled={disabled}
                label={label}
                style={style}
            >
                <Checkbox {...checkboxProps} aria-label={ariaLabel} disabled={disabled} />
            </ToggleOption>
        )
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
