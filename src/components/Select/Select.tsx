import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { useMemo } from 'react';
import { Combobox, ComboboxProps } from '-/components/Combobox';
import { ListItem } from '-/components/ListItem';
import { useId } from '-/hooks/useId';
import { CommonProps, FormFieldControlProps } from '-/types/common';

import './select.scss';

export type SelectOption = Record<string, unknown> & {
    /** The value of the option. */
    value: string;
    /** The label of the option. This is the text that will be displayed on the option. */
    label: string;
};

export type SelectProps<T extends SelectOption = SelectOption> = CommonProps<'invalid' | 'name' | 'size'> &
    FormFieldControlProps &
    Pick<
        ComboboxProps<T>,
        | 'disabled'
        | 'elementAttributes'
        | 'id'
        | 'isMulti'
        | 'itemDisplayCount'
        | 'label'
        | 'onChange'
        | 'readOnly'
        | 'selectAll'
        | 'value'
    > & {
        /**
         * Array of options to display in the select
         *
         * @example
         *     [
         *         { value: '1', label: 'Option 1' },
         *         { value: '2', label: 'Option 2' },
         *         { value: '3', label: 'Option 3' },
         *         { value: '4', label: 'Option 4' },
         *         { value: '5', label: 'Option 5' },
         *         { value: '6', label: 'Option 6' },
         *         { value: '7', label: 'Option 7' },
         *         { value: '8', label: 'Option 8' },
         *         { value: '9', label: 'Option 9' },
         *         { value: '10', label: 'Option 10' },
         *     ];
         *
         * @type Array<SelectOption>
         * @required
         */
        options: T[];
        /**
         * Placeholder for the select
         *
         * @default Select one
         */
        placeholder?: string;
        /**
         * The description for the select.
         *
         * This is typically used to provide additional context or instructions for the user.
         */
        description?: string;
    };

/**
 * A field element that allows users to select one option from a list of available choices.
 *
 * @example
 *     import { Select } from '@bspk/ui/Select';
 *
 *     export function Example() {
 *         const [selected, setSelected] = React.useState<string[]>([]);
 *         return (
 *             <Select
 *                 label="Select an option"
 *                 itemCount={5}
 *                 name="example-select"
 *                 onChange={setSelected}
 *                 options={[
 *                     { value: '1', label: 'Option 1' },
 *                     { value: '2', label: 'Option 2' },
 *                     { value: '3', label: 'Option 3' },
 *                     { value: '4', label: 'Option 4' },
 *                     { value: '5', label: 'Option 5' },
 *                     { value: '6', label: 'Option 6' },
 *                     { value: '7', label: 'Option 7' },
 *                     { value: '8', label: 'Option 8' },
 *                     { value: '9', label: 'Option 9' },
 *                     { value: '10', label: 'Option 10' },
 *                 ]}
 *                 placeholder="Select an option"
 *                 size="medium"
 *                 value={selected}
 *             />
 *         );
 *     }
 *
 * @name Select
 * @phase Dev
 */
export function Select({
    options = [],
    value: selected,
    onChange,
    label,
    placeholder = 'Select one',
    size = 'medium',
    itemDisplayCount = 5,
    disabled,
    id: propId,
    invalid,
    readOnly,
    name,
    isMulti,
    selectAll,
    description,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    elementAttributes,
}: SelectProps) {
    const id = useId(propId);

    const selectedItem: SelectOption | undefined = useMemo(() => {
        if (isMulti)
            return {
                label: `${selected?.length || 0} option${selected?.length !== 1 ? 's' : ''} selected`,
                value: selected?.join(', ') || '',
            };

        return options.find((o) => o.value === selected?.[0]);
    }, [isMulti, options, selected]);

    return (
        <Combobox
            description={description || ''}
            disabled={disabled}
            elementAttributes={elementAttributes}
            id={id}
            isMulti={isMulti}
            itemDisplayCount={itemDisplayCount}
            items={options}
            label={placeholder || label}
            onChange={onChange}
            readOnly={readOnly}
            selectAll={selectAll}
            value={selected || []}
        >
            {({ setReference, toggleProps }) => (
                <>
                    <input defaultValue={selected} name={name} type="hidden" />
                    <span
                        {...toggleProps}
                        aria-describedby={ariaDescribedBy || undefined}
                        aria-disabled={disabled || readOnly}
                        aria-errormessage={ariaErrorMessage || undefined}
                        aria-label={label || selectedItem?.label || placeholder}
                        data-bspk="select"
                        data-invalid={invalid || undefined}
                        data-size={size}
                        id={id}
                        ref={(node) => {
                            if (node) setReference(node);
                        }}
                    >
                        <ListItem
                            data-bspk-owner="select"
                            data-placeholder={!selectedItem || undefined}
                            label={selectedItem?.label || placeholder}
                            owner="select"
                            readOnly
                        />
                        <span data-icon>
                            <SvgChevronRight />
                        </span>
                    </span>
                </>
            )}
        </Combobox>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
