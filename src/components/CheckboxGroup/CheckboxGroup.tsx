import './checkbox-group.scss';
import { CheckboxOption, CheckboxOptionProps } from '-/components/CheckboxOption';
import { useFieldInit } from '-/components/Field';
import { ElementProps, FieldControlProps } from '-/types/common';

const ALL_LABEL = 'All';

export type CheckboxGroupOption = Omit<CheckboxOptionProps, 'name' | 'onChange'>;

export type CheckboxGroupProps = Omit<FieldControlProps<string[]>, 'readOnly'> & {
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
 * For a more complete example with field usage, see the CheckboxGroupField component.
 *
 * @example
 *     import { CheckboxGroup } from '@bspk/ui/CheckboxGroup';
 *
 *     () => {
 *         const [value, setValue] = useState<string[]>([]);
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
 *                 value={value}
 *                 onChange={(nextValue: string[]) => {
 *                     setValue(nextValue);
 *                 }}
 *             />
 *         );
 *     };
 *
 * @name CheckboxGroup
 * @phase Stable
 */
export function CheckboxGroup({
    onChange,
    options = [],
    name,
    value = [],
    selectAll,
    selectAllProps,
    disabled = false,
    invalid: invalidProp,
    required,
    id: idProp,
    'aria-describedby': ariaDescribedByProp,
    'aria-errormessage': ariaErrorMessageProp,
    ...props
}: ElementProps<CheckboxGroupProps, 'div'>) {
    const { id, ariaDescribedBy, ariaErrorMessage, invalid } = useFieldInit({
        idProp,
        required,
        disabled,
        invalidProp,
    });

    return (
        <div
            {...props}
            aria-describedby={ariaDescribedByProp || ariaDescribedBy || undefined}
            data-bspk="checkbox-group"
            id={id}
            role="group"
        >
            {selectAll && (
                <CheckboxOption
                    aria-errormessage={ariaErrorMessageProp || ariaErrorMessage || undefined}
                    aria-label={selectAllProps?.label || ALL_LABEL}
                    checked={!!value.length && value.length === options.length}
                    data-testid="selectAll-Checkbox"
                    disabled={disabled}
                    indeterminate={!!value.length && value.length < options.length}
                    invalid={invalid || undefined}
                    label={selectAllProps?.label || ALL_LABEL}
                    name={name}
                    onChange={(checked) => onChange(checked ? options.map((o) => o.value) : [])}
                    value="all"
                />
            )}
            {options.map(({ label, description, value: optionValue, disabled: optionDisabled }) => (
                <CheckboxOption
                    aria-errormessage={ariaErrorMessageProp || ariaErrorMessage || undefined}
                    aria-label={label}
                    checked={value.includes(optionValue)}
                    description={description}
                    disabled={disabled || optionDisabled}
                    invalid={invalid || undefined}
                    key={optionValue}
                    label={label}
                    name={name}
                    onChange={(checked) => {
                        onChange(checked ? [...value, optionValue] : value.filter((v) => v !== optionValue));
                    }}
                    value={optionValue}
                />
            ))}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
