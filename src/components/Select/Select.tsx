import './select.scss';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { ElementType, useMemo, KeyboardEvent, MouseEvent } from 'react';
import { Checkbox } from '-/components/Checkbox';
import { ListItem, ListItemProps } from '-/components/ListItem';
import { ListItemMenu, ListItemMenuProps, MenuListItem } from '-/components/ListItemMenu';
import { useId } from '-/hooks/useId';
import { CommonProps, ElementProps, FormFieldControlProps } from '-/types/common';
import { getElementById } from '-/utils/dom';

const DEFAULT_PLACEHOLDER = 'Select one';

const multiSelectValue = (values: string[], selected: boolean, currentValue: string) => {
    const next = values.filter((val) => val !== currentValue);
    return selected ? [...next, currentValue] : next;
};

const multiSelectAllItem = (
    isMulti: boolean,
    menuId: string,
    value: string[],
    items: (MenuListItem & { value: string })[],
    onChange: SelectProps['onChange'],
    selectAll?: string,
): MenuListItem[] => {
    if (!isMulti) return [];

    const enabledItems = items.filter((item) => !item.disabled);

    const allSelected = value?.length === enabledItems.length;

    const selectAllLabel = selectAll || 'Select All';

    return [
        {
            as: 'label' as ElementType,
            id: `select-${menuId}-select-all`,
            label: selectAllLabel,
            trailing: (
                <Checkbox
                    aria-label={selectAllLabel}
                    checked={!!allSelected}
                    indeterminate={!allSelected && value.length > 0}
                    name=""
                    onChange={(checked) => {
                        onChange?.(checked ? items.map((item) => item.value) : []);
                    }}
                    value="select-all"
                />
            ),
        },
    ];
};

/**
 * An option in a Select component.
 *
 * Essentially the props of ListItemProps. Except for `value` which is required.
 */
export type SelectOption = Omit<ListItemProps, 'id' | 'onClick' | 'value'> & { value: string };

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
        options: SelectOption[];
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
        onChange: (value: string[], event?: KeyboardEvent | MouseEvent) => void;
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
    placeholder: placeholderProp,
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
    const placeholder = placeholderProp || DEFAULT_PLACEHOLDER;

    const items = useMemo(() => {
        const nextItems = optionsProp.map((item, index): MenuListItem & { value: string } => ({
            ...item,
            id: `${menuId}-item-${index}`,
        }));

        if (isMulti) {
            return nextItems.map((item) => ({
                ...item,
                as: 'label' as ElementType,
                ariaHideLabel: true,
                trailing: (
                    <Checkbox
                        aria-label={item.label}
                        checked={value.includes(item.value)}
                        name={item.id}
                        onChange={(checked) => {
                            onChange?.(multiSelectValue(value, checked, item.value));
                        }}
                        value={item.value}
                    />
                ),
            }));
        }

        return nextItems;
    }, [optionsProp, isMulti, menuId, value, onChange]);

    const selectedItem = useMemo(() => {
        if (isMulti)
            return {
                label: `${value?.length || 0} option${value?.length !== 1 ? 's' : ''} selected`,
                id: value?.join(', ') || '',
            };
        return items.find((o) => o.value === value?.[0]);
    }, [isMulti, items, value]);

    const descriptionId = useMemo(() => (description ? `${id}-description` : undefined), [description, id]);

    return (
        <ListItemMenu
            activeElementId={isMulti ? undefined : selectedItem?.id}
            id={menuId}
            items={[
                ...multiSelectAllItem(
                    isMulti,
                    menuId,
                    value,
                    items as (MenuListItem & { value: string })[],
                    onChange,
                    selectAll,
                ),
                ...items,
            ]}
            label={label}
            onClick={({ event, currentId, setShow }) => {
                if (isMulti) {
                    getElementById(currentId)?.click();
                    // noop, onChange is handled in the item onClick or by label's default behavior
                    return;
                }
                event.preventDefault();
                onChange?.([items.find((i) => i.id === currentId)?.value || ''], event);
                setShow(false);
            }}
            owner="select"
            role={isMulti ? 'group' : 'listbox'}
            scrollLimit={scrollLimit || 5}
        >
            {(toggleProps, { setRef, show }) => {
                return (
                    <>
                        <span data-sr-only id={descriptionId}>
                            {description}
                        </span>
                        <input defaultValue={value} name={name} type="hidden" />
                        <div
                            {...props}
                            aria-describedby={descriptionId || ariaDescribedBy || undefined}
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
                                aria-hidden={show || undefined}
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

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
