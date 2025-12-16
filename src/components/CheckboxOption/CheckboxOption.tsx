import { CheckboxProps, Checkbox } from '-/components/Checkbox';
import { ListItem } from '-/components/ListItem';
import { CommonProps } from '-/types/common';

export type CheckboxOptionProps = CheckboxProps &
    CommonProps<'style'> & {
        /**
         * The label of the option. Also used as the aria-label of the control.
         *
         * @required
         */
        label: string;
        /**
         * The description of the option.
         *
         * @type multiline
         */
        description?: string;
    };

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
    const ariaLabel = description ? `${labelProp} - ${description}` : labelProp;
    return (
        <ListItem
            aria-disabled={disabled || undefined}
            as="label"
            label={labelProp}
            leading={<Checkbox {...checkboxProps} aria-label={ariaLabel} disabled={disabled} />}
            owner="checkbox-option"
            style={style}
            subText={description}
            width="hug"
        />
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
