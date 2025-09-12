import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { useMemo } from 'react';

import { Checkbox } from '-/components/Checkbox';
import { ListItem } from '-/components/ListItem';
import { ListItemMenu, ListItemMenuProps, MenuListItem } from '-/components/ListItemMenu';
import { useId } from '-/hooks/useId';
import { CommonProps, ElementProps, FormFieldControlProps } from '-/types/common';

import './select.scss';

/**
 * An option in a Select component.
 *
 * Essentially the props of ListItem, but 'id' is required as it's used as the value.
 */

export type SelectProps = CommonProps<'disabled' | 'id' | 'invalid' | 'name' | 'readOnly' | 'size'> &
    FormFieldControlProps &
    Pick<ListItemMenuProps, 'scrollLimit'> & {
        /**
         * Array of options to display in the select
         *
         * @example
         *     [
         *         { id: '1', label: 'Option 1' },
         *         { id: '2', label: 'Option 2' },
         *         { id: '3', label: 'Option 3' },
         *         { id: '4', label: 'Option 4' },
         *         { id: '5', label: 'Option 5' },
         *         { id: '6', label: 'Option 6' },
         *         { id: '7', label: 'Option 7' },
         *         { id: '8', label: 'Option 8' },
         *         { id: '9', label: 'Option 9' },
         *         { id: '10', label: 'Option 10' },
         *     ];
         *
         * @type Array<SelectOption>
         * @required
         */
        options: MenuListItem[];
        /**
         * Array of selected values
         *
         * @type Array<string>
         */
        value?: Array<string>;
        /**
         * Whether the listbox allows multiple selections.
         *
         * @default false
         */
        isMulti?: boolean;
        /**
         * The label for the "Select All" option.
         *
         * @default Select All
         */
        selectAll?: string;
        /**
         * The function to call when the selected values change.
         *
         * @example
         *     (value, event) => setState({ value });
         *
         * @required
         */
        onChange: (value: string[], event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        /**
         * The label for the select element, used for accessibility, and the dropdown modal header.
         *
         * @required
         */
        label: string;
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
 *                     { id: '1', label: 'Option 1' },
 *                     { id: '2', label: 'Option 2' },
 *                     { id: '3', label: 'Option 3' },
 *                     { id: '4', label: 'Option 4' },
 *                     { id: '5', label: 'Option 5' },
 *                     { id: '6', label: 'Option 6' },
 *                     { id: '7', label: 'Option 7' },
 *                     { id: '8', label: 'Option 8' },
 *                     { id: '9', label: 'Option 9' },
 *                     { id: '10', label: 'Option 10' },
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
    options: optionsProp = [],
    value = [],
    onChange,
    label,
    placeholder = 'Select one',
    size = 'medium',
    disabled,
    id: propId,
    invalid,
    readOnly,
    name,
    isMulti = false,
    selectAll = 'Select All',
    description,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    scrollLimit,
    ...props
}: ElementProps<SelectProps, 'div'>) {
    const id = useId(propId);
    const menuId = useMemo(() => `select-${id}-menu`, [id]);

    const items = useItems({
        value,
        options: optionsProp,
        isMulti,
        selectAll,
        onChange,
        id: menuId,
    });

    const selectedItem: MenuListItem | undefined = useMemo(() => {
        if (isMulti)
            return {
                label: `${value?.length || 0} option${value?.length !== 1 ? 's' : ''} selected`,
                id: value?.join(', ') || '',
            };
        return items.find((o) => o.id === value?.[0]);
    }, [isMulti, items, value]);

    return (
        <ListItemMenu
            activeElementId={isMulti ? undefined : selectedItem?.id}
            id={menuId}
            items={({ setShow }) => {
                if (isMulti) return items;
                return items.map((item) => ({
                    ...item,
                    onClick: (event) => {
                        item.onClick?.(event);
                        onChange([item.id], event);
                        setShow(false);
                    },
                }));
            }}
            label={label}
            owner="select"
            role="listbox"
            scrollLimit={scrollLimit || 5}
        >
            {(toggleProps, { setRef, show }) => {
                return (
                    <>
                        <span style={{ display: 'none' }}>{description}</span>
                        <input defaultValue={value} name={name} type="hidden" />
                        <div
                            {...props}
                            aria-describedby={ariaDescribedBy || undefined}
                            aria-disabled={disabled || readOnly}
                            aria-errormessage={ariaErrorMessage || undefined}
                            aria-label={label || selectedItem?.label || placeholder}
                            data-bspk="select"
                            data-invalid={invalid || undefined}
                            data-size={size}
                            id={id}
                            ref={setRef}
                            {...toggleProps}
                            aria-controls={(show && menuId) || undefined}
                            aria-expanded={toggleProps['aria-expanded']}
                            aria-haspopup="listbox"
                            role="combobox"
                        >
                            <ListItem
                                data-bspk-owner="select"
                                data-placeholder={!selectedItem || undefined}
                                owner="select"
                                readOnly
                                {...(selectedItem || { label: placeholder })}
                                id={`${id}-selected-value`}
                                onClick={undefined}
                            />
                            <span data-icon>
                                <SvgChevronRight />
                            </span>
                        </div>
                    </>
                );
            }}
        </ListItemMenu>
    );
}

/** A hook to generate the items for the select listbox. */
function useItems({
    value: selectedValues = [],
    options,
    isMulti,
    selectAll,
    onChange,
    id,
}: {
    value: string[];
    options: MenuListItem[];
    isMulti: boolean;
    selectAll: string;
    onChange: (value: string[], event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    id: string;
}) {
    return useMemo(() => {
        const allSelected = isMulti ? selectedValues?.length === options.length : false;

        const multiSelectValue = (selected: boolean, itemValue: string) => {
            const next = selectedValues.filter((value) => value !== itemValue);
            return selected ? [...next, itemValue] : next;
        };

        const nextItems: MenuListItem[] = [];

        if (isMulti)
            nextItems.push({
                as: 'label',
                id: `${id}-select-all`,
                label: selectAll || 'Select All',
                trailing: (
                    <Checkbox
                        aria-label={selectAll}
                        checked={!!allSelected}
                        indeterminate={!allSelected && selectedValues.length > 0}
                        name=""
                        onChange={(checked) => {
                            onChange?.(checked ? options.map((item) => item.id) : []);
                        }}
                        value="select-all"
                    />
                ),
            });

        nextItems.push(
            ...options.map((item) => {
                const selected = selectedValues.includes(item.id);
                return {
                    ...item,
                    as: isMulti ? 'label' : item.as,
                    disabled: item.disabled || undefined,
                    trailing: isMulti ? (
                        <Checkbox
                            aria-label={item.label}
                            checked={selected}
                            name={item.id}
                            onChange={(checked) => {
                                onChange?.(multiSelectValue(checked, item.id));
                            }}
                            value={item.id}
                        />
                    ) : (
                        item.trailing || undefined
                    ),
                };
            }),
        );

        return nextItems;
    }, [id, isMulti, onChange, options, selectAll, selectedValues]);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
