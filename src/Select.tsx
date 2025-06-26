import './select.scss';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { useMemo } from 'react';

import { Combobox, ComboboxProps } from './Combobox';
import { ListItem } from './ListItem';
import { useId } from './hooks/useId';

import { CommonProps, ElementProps } from './';

export type SelectOption = Record<string, unknown> & {
    /** The value of the option. */
    value: string;
    /** The label of the option. This is the text that will be displayed on the option. */
    label: string;
};

export type SelectProps<T extends SelectOption = SelectOption> = CommonProps<'name' | 'size'> &
    Pick<
        ComboboxProps<T>,
        | 'disabled'
        | 'errorMessage'
        | 'id'
        | 'invalid'
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
 * @phase DesignReview
 */
function Select({
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
    errorMessage,
    readOnly,
    name,
    isMulti,
    selectAll,
    description,
    ...props
}: ElementProps<SelectProps, 'button'>) {
    const id = useId(propId);

    const selectedItem: SelectOption = useMemo(() => {
        if (isMulti)
            return {
                label: `${selected?.length || 0} option${selected?.length !== 1 ? 's' : ''} selected`,
                value: selected?.join(', ') || '',
            };

        return options.find((o) => o.value === selected?.[0]) || { label: placeholder, value: '' };
    }, [isMulti, options, placeholder, selected]);

    return (
        <Combobox
            description={description || ''}
            disabled={disabled}
            errorMessage={errorMessage}
            header={placeholder || label}
            id={id}
            invalid={invalid}
            isMulti={isMulti}
            itemDisplayCount={itemDisplayCount}
            items={options}
            label={label}
            onChange={onChange}
            readOnly={readOnly}
            selectAll={selectAll}
            value={selected || []}
        >
            {({ setReference, ...toggleProps }) => (
                <>
                    <input defaultValue={selected} name={name} type="hidden" />
                    <button
                        aria-label={label || selectedItem?.label || placeholder}
                        data-bspk="select"
                        data-empty={selectedItem?.label ? undefined : ''}
                        data-invalid={invalid || undefined}
                        data-size={size}
                        disabled={disabled || readOnly}
                        id={id}
                        ref={(node) => {
                            if (node) setReference(node);
                        }}
                        {...props}
                        {...toggleProps}
                    >
                        <ListItem as="span" data-placeholder {...selectedItem} readOnly />
                        <span data-icon>
                            <SvgChevronRight />
                        </span>
                    </button>
                </>
            )}
        </Combobox>
    );
}

Select.bspkName = 'Select';

export { Select };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
