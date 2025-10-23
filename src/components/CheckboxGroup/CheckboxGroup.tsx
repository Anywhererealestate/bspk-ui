import { Checkbox, CheckboxProps } from '-/components/Checkbox';
import { ToggleOptionProps, ToggleOption } from '-/components/ToggleOption';
import { ElementProps, FieldControlProps } from '-/types/common';

export type CheckboxGroupOption = Pick<CheckboxProps, 'value'> &
    Pick<ToggleOptionProps, 'description' | 'disabled' | 'label'>;

export type CheckboxGroupProps = FieldControlProps<string[]> & {
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
     * Whether to show a select all checkbox at the top of the list.
     *
     * @default false
     */
    selectAll?: boolean;
    /** The props for the select all checkbox. */
    selectAllProps?: CheckboxGroupOption;
};

/**
 * A group of checkboxes that allows users to choose one or more items from a list or turn an feature on or off.
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
    value = [],
    selectAll,
    selectAllProps,
    disabled: disabledGroup = false,
    readOnly,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    ...props
}: ElementProps<CheckboxGroupProps, 'div'>) {
    return (
        <div
            {...props}
            aria-describedby={ariaErrorMessage || ariaDescribedBy || undefined}
            data-bspk="checkbox-group"
            role="group"
        >
            {selectAll && (
                <ToggleOption label={selectAllProps?.label || 'All'} readOnly={readOnly}>
                    <Checkbox
                        aria-label={selectAllProps?.label || 'All'}
                        checked={!!value.length && value.length === options.length}
                        data-testid="selectAll-Checkbox"
                        disabled={disabledGroup}
                        indeterminate={!!value.length && value.length < options.length}
                        name={name}
                        onChange={(checked) => onChange(checked ? options.map((o) => o.value) : [])}
                        readOnly={readOnly}
                        value="all"
                    />
                </ToggleOption>
            )}
            {options.map(({ label, description, value: optionValue, disabled }) => (
                <ToggleOption
                    description={description}
                    disabled={disabled || disabledGroup}
                    key={optionValue}
                    label={label}
                    readOnly={readOnly}
                >
                    <Checkbox
                        aria-label={label}
                        checked={value.includes(optionValue)}
                        disabled={disabled || disabledGroup}
                        name={name}
                        onChange={(checked) => {
                            onChange(checked ? [...value, optionValue] : value.filter((v) => v !== optionValue));
                        }}
                        readOnly={readOnly}
                        value={optionValue}
                    />
                </ToggleOption>
            ))}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
