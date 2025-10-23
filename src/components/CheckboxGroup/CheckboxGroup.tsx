import './checkbox-groups.scss';
import { Checkbox } from '-/components/Checkbox';
import { useFieldInit } from '-/components/Field';
import { ToggleOptionProps, ToggleOption } from '-/components/ToggleOption';
import { useId } from '-/hooks/useId';
import { ElementProps, CommonProps } from '-/types/common';
import { cssWithVars } from '-/utils/cwv';

export type CheckboxGroupOption = Pick<ToggleOptionProps, 'description' | 'disabled' | 'invalid' | 'label'> &
    Required<CommonProps<'value'>>;

export type CheckboxGroupProps = CommonProps<'aria-label' | 'disabled' | 'invalid' | 'required'> & {
    /**
     * The function to call when the checkboxes are changed.
     *
     * @example
     *     (values) => setState({ values });
     *
     * @required
     */
    onChange: (values: string[]) => void;
    /**
     * The input control name of the checkboxes.
     *
     * @required
     */
    name: string;
    /**
     * The options for the checkboxes.
     *
     * @example
     *     [
     *         { label: 'Option 1', value: 'option1' },
     *         { label: 'Option 2', value: 'option2' },
     *         { label: 'Option 3', value: 'option3' },
     *     ];
     *
     * @type Array<CheckboxGroupOption>
     * @required
     */
    options: CheckboxGroupOption[];
    /**
     * The values of the checked checkboxes.
     *
     * @type Array<string>
     */
    values?: CheckboxGroupProps['options'][number]['value'][];
    /**
     * Whether to show a select all checkbox at the top of the list.
     *
     * If a string is provided, it will be used as the label for the select all option.
     *
     * If true, the label will default to "All".
     *
     * @default false
     * @type boolean
     */
    selectAll?: boolean | string;
};

/**
 * A group of checkboxes that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * For a more complete example with field usage, see the CheckboxGroupField component.
 *
 * @example
 *     import { CheckboxGroup } from '@bspk/ui/CheckboxGroup';
 *
 *     function Example() {
 *         const [values, setValues] = React.useState<string[]>([]);
 *
 *         return (
 *             <CheckboxGroup
 *                 aria-label="Example Checkbox Group"
 *                 name="example-checkbox-group"
 *                 options={[
 *                     { label: 'Option 1', value: 'option1' },
 *                     { label: 'Option 2', value: 'option2' },
 *                     { label: 'Option 3', value: 'option3' },
 *                 ]}
 *                 values={values}
 *                 onChange={(nextValues: string[]) => {
 *                     setValues(nextValues);
 *                 }}
 *             />
 *         );
 *     }
 *
 * @name CheckboxGroup
 * @phase UXReview
 */
export function CheckboxGroup({
    onChange,
    options = [],
    name,
    values = [],
    selectAll,
    disabled = false,
    invalid: invalidProp = false,
    'aria-describedby': ariaDescribedByProp,
    'aria-errormessage': ariaErrorMessageProp,
    id: idProp,
    required,
    ...props
}: ElementProps<CheckboxGroupProps, 'div'>) {
    const id = useId(idProp);
    const fieldProps = useFieldInit({ required });
    const invalid = !disabled && (invalidProp || !!fieldProps.ariaErrorMessage);

    return (
        <div
            {...props}
            aria-describedby={ariaDescribedByProp || fieldProps.ariaDescribedBy || undefined}
            aria-label={props['aria-label']}
            data-bspk="checkbox-group"
            id={id}
            role="group"
            style={cssWithVars({
                '--list-item-height': 'auto',
            })}
        >
            {!!selectAll && (
                <ToggleOption disabled={disabled} label={typeof selectAll === 'string' ? selectAll : 'All'}>
                    <Checkbox
                        aria-errormessage={ariaErrorMessageProp || fieldProps.ariaErrorMessage || undefined}
                        aria-label={typeof selectAll === 'string' ? selectAll : 'All'}
                        checked={!!values.length && values.length === options.length}
                        data-testid="selectAll-Checkbox"
                        disabled={disabled}
                        indeterminate={!!values.length && values.length < options.length}
                        invalid={invalid}
                        name={name}
                        onChange={(checked) => onChange(checked ? options.map((o) => o.value) : [])}
                        value="all"
                    />
                </ToggleOption>
            )}
            <ul>
                {options.map(({ label, description, value, ...item }, index) => (
                    <li key={`checkbox-group-option-${index}`}>
                        <ToggleOption description={description} disabled={item.disabled || disabled} label={label}>
                            <Checkbox
                                aria-errormessage={ariaErrorMessageProp || fieldProps.ariaErrorMessage || undefined}
                                aria-label={label}
                                checked={values.includes(value)}
                                disabled={item.disabled || disabled}
                                invalid={invalid}
                                name={name}
                                onChange={(checked) => {
                                    onChange(checked ? [...values, value] : values.filter((v) => v !== value));
                                }}
                                value={value}
                            />
                        </ToggleOption>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
