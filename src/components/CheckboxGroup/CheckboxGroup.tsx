import { Checkbox } from '-/components/Checkbox';
import { ToggleOptionProps, ToggleOption } from '-/components/ToggleOption';
import { ElementProps, CommonProps } from '-/types/common';

export type CheckboxGroupOption = Pick<ToggleOptionProps, 'description' | 'label'> & Required<CommonProps<'value'>>;

export type CheckboxGroupProps = CommonProps<'aria-label' | 'disabled' | 'readOnly'> & {
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
 * @phase EngineeringReview
 */
function CheckboxGroup({
    onChange,
    options = [],
    name,
    values = [],
    selectAll,
    selectAllProps,
    disabled,
    readOnly,
    ...props
}: ElementProps<CheckboxGroupProps, 'div'>) {
    return (
        <div {...props} data-bspk="checkbox-group" role="group">
            {selectAll && (
                <>
                    <ToggleOption label={selectAllProps?.label || 'All'}>
                        <Checkbox
                            aria-label={selectAllProps?.label || 'All'}
                            checked={!!values.length && values.length === options.length}
                            disabled={disabled}
                            indeterminate={!!values.length && values.length < options.length}
                            name={name}
                            onChange={(checked) => onChange(checked ? options.map((o) => o.value) : [])}
                            readOnly={readOnly}
                            value="all"
                        />
                    </ToggleOption>
                </>
            )}
            {options.map(({ label, description, value }) => (
                <ToggleOption description={description} key={value} label={label}>
                    <Checkbox
                        aria-label={label}
                        checked={values.includes(value)}
                        disabled={disabled}
                        name={name}
                        onChange={(checked) => {
                            onChange(checked ? [...values, value] : values.filter((v) => v !== value));
                        }}
                        readOnly={readOnly}
                        value={value}
                    />
                </ToggleOption>
            ))}
        </div>
    );
}

CheckboxGroup.bspkName = 'CheckboxGroup';

export { CheckboxGroup };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
