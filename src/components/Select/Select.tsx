import './select.scss';
import { SvgKeyboardArrowDown } from '@bspk/icons/KeyboardArrowDown';
import { ElementType, useMemo, KeyboardEvent, MouseEvent, useState } from 'react';
import { Checkbox } from '-/components/Checkbox';
import { ListItem, ListItemProps } from '-/components/ListItem';
import { Menu } from '-/components/Menu';
import { useArrowNavigation } from '-/hooks/useArrowNavigation';
import { useFloating } from '-/hooks/useFloating';
import { useId } from '-/hooks/useId';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { useUIContext } from '-/hooks/useUIContext';
import { CommonProps, ElementProps, FormFieldControlProps } from '-/types/common';
import { handleKeyDown } from '-/utils/handleKeyDown';
import { scrollListItemsStyle } from '-/utils/scrollListItemsStyle';

const DEFAULT_PLACEHOLDER = 'Select one';

const multiSelectValue = (values: string[], selected: boolean, currentValue: string) => {
    const next = values.filter((val) => val !== currentValue);
    return selected ? [...next, currentValue] : next;
};

const selectAllId = (menuId: string) => `${menuId}-select-all`;

/**
 * An option in a Select component.
 *
 * Essentially the props of ListItemProps. Except for `value` which is required.
 */
export type SelectOption = Omit<ListItemProps, 'id' | 'onClick' | 'subText' | 'value'> & { value: string };

export type SelectItem = SelectOption & { id: string };

export type SelectProps = CommonProps<'disabled' | 'id' | 'invalid' | 'name' | 'readOnly' | 'scrollLimit' | 'size'> &
    FormFieldControlProps & {
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
        value: Array<string>;
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
    id: idProp,
    invalid,
    readOnly,
    name,
    isMulti = false,
    selectAll = 'Select All',
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    'aria-labelledby': ariaLabelledBy,
    scrollLimit,
    ...props
}: ElementProps<SelectProps, 'div'>) {
    const id = useId(idProp);
    const menuId = useMemo(() => `${id}-menu`, [id]);
    const placeholder = placeholderProp || DEFAULT_PLACEHOLDER;

    const { items, availableItems } = useMemo(() => {
        const nextItems = optionsProp.map(
            (item, index): SelectItem => ({
                ...item,
                id: `${id}-item-${index}`,
                'aria-label': item.label,
                'aria-selected': isMulti ? undefined : value.includes(item.value),
            }),
        );

        return { items: nextItems, availableItems: nextItems.filter((item) => !item.disabled) };
    }, [optionsProp, isMulti, id, value]);

    const selectedItem = useMemo((): SelectItem | undefined => {
        if (isMulti)
            return {
                label: `${value?.length || 0} option${value?.length !== 1 ? 's' : ''} selected`,
                id: value?.join(', ') || '',
                value: '',
            };
        return items.find((o) => o.value === value?.[0]);
    }, [isMulti, items, value]);

    const { sendAriaLiveMessage } = useUIContext();

    const [show, setShow] = useState(false);

    const { elements, floatingStyles } = useFloating({
        hide: !show,
        offsetOptions: 4,
    });

    const { activeElementId, setActiveElementId, arrowKeyCallbacks } = useArrowNavigation({
        ids: [
            //
            ...(isMulti ? [selectAllId(menuId)] : []),
            ...availableItems.map((i) => i.id),
        ],
    });

    useOutsideClick({
        elements: [elements.floating, elements.reference],
        callback: () => {
            if (show) setShow(false);
            setActiveElementId(null);
            sendAriaLiveMessage('closed');
        },
        disabled: !show,
    });

    const onItemSelect = (item?: SelectItem) => {
        if (!item || item.disabled || item.readOnly) return;

        if (!isMulti) {
            setShow(false);
            onChange?.([item.value]);
            return;
        }

        onChange?.(multiSelectValue(value, !value.includes(item.value), item.value));
    };

    const spaceEnter = () => {
        if (!show) {
            elements.reference?.click();
            return;
        }

        if (activeElementId) onItemSelect(items.find((i) => i.id === activeElementId));
    };

    return (
        <>
            <input name={name} type="hidden" value={value} />
            {!ariaLabelledBy && (
                <div data-sr-only id={`${id}-label`}>
                    {label}
                </div>
            )}
            <div
                {...props}
                aria-activedescendant={show ? activeElementId || undefined : undefined}
                aria-autocomplete="list"
                aria-controls={(show && menuId) || undefined}
                aria-describedby={ariaDescribedBy || undefined}
                aria-disabled={disabled || undefined}
                aria-errormessage={ariaErrorMessage || undefined}
                aria-expanded={show}
                aria-haspopup="listbox"
                aria-labelledby={ariaLabelledBy || `${id}-label`}
                aria-readonly={readOnly || undefined}
                data-bspk="select"
                data-invalid={invalid || undefined}
                data-open={show || undefined}
                data-size={size}
                id={id}
                onBlur={(event) => {
                    if (!show || (event.relatedTarget && elements.floating?.contains(event.relatedTarget as Element)))
                        return;

                    setShow(false);
                    setActiveElementId(null);
                    sendAriaLiveMessage('closed');
                }}
                onClick={() => {
                    console.log('click');
                    //
                    if (!items.length) return;

                    if (show) {
                        const item = items.find((i) => i.id === activeElementId);

                        if (!item || item.disabled) return;

                        if (!isMulti) {
                            setShow(false);
                            onChange?.([item.value]);
                            return;
                        }
                    }

                    const nextShow = !show;
                    setShow(nextShow);

                    if (nextShow) {
                        const nextActiveId = (!isMulti && selectedItem?.id) || items[0].id!;
                        setActiveElementId(nextActiveId);
                    }
                }}
                onKeyDown={handleKeyDown(
                    {
                        ...arrowKeyCallbacks,
                        ArrowDown: (event) => {
                            if (!show) spaceEnter();
                            arrowKeyCallbacks.ArrowDown?.(event);
                        },
                        Space: spaceEnter,
                        Enter: spaceEnter,
                        'Ctrl+Option+Space': spaceEnter,
                    },
                    { preventDefault: true, stopPropagation: true },
                )}
                ref={elements.setReference}
                role="combobox"
                tabIndex={0}
            >
                <ListItem
                    aria-hidden={true}
                    aria-labelledby={ariaLabelledBy || `${id}-label`}
                    data-bspk-owner="select"
                    data-placeholder={!selectedItem || undefined}
                    id={`${id}-selected-value`}
                    label={selectedItem?.label || placeholder}
                    leading={selectedItem?.leading}
                    onClick={undefined}
                    owner="select"
                    trailing={selectedItem?.trailing}
                />
                <SvgKeyboardArrowDown />
            </div>
            <Menu
                aria-autocomplete={undefined}
                aria-label={label}
                as={isMulti ? 'div' : 'ul'}
                id={menuId}
                innerRef={elements.setFloating}
                label={label}
                owner="select"
                role={isMulti ? 'group' : 'listbox'}
                style={{
                    ...floatingStyles,
                    ...scrollListItemsStyle(scrollLimit, items.length),
                }}
                tabIndex={-1}
            >
                {isMulti && (
                    // select all option
                    <ListItem
                        aria-label={undefined}
                        as="label"
                        data-active={activeElementId === selectAllId(menuId) || undefined}
                        id={selectAllId(menuId)}
                        key="select-all"
                        label={selectAll || 'Select All'}
                        owner="select"
                        tabIndex={-1}
                        trailing={
                            <Checkbox
                                aria-label={selectAll || 'Select All'}
                                checked={!!(value?.length === availableItems.length)}
                                indeterminate={!(value?.length === availableItems.length) && value.length > 0}
                                name={selectAllId(menuId)}
                                onChange={(checked) => {
                                    onChange?.(checked ? availableItems.map((item) => item.value) : []);
                                }}
                                tabIndex={-1}
                                value="select-all"
                            />
                        }
                    />
                )}
                {items.map((item) => {
                    const isActive = activeElementId === item.id;
                    const isSelected = value.includes(item.value);

                    const multiProps: Partial<ListItemProps> = isMulti
                        ? {
                              as: 'label' as ElementType,
                              role: undefined,
                              trailing: (
                                  <Checkbox
                                      aria-label={item.label}
                                      checked={value.includes(item.value)}
                                      name={item.id}
                                      onChange={(checked) => {
                                          onChange?.(multiSelectValue(value, checked, item.value));
                                      }}
                                      tabIndex={-1}
                                      value={item.value}
                                  />
                              ),
                          }
                        : {
                              as: 'li' as ElementType,
                              role: 'option',
                              'aria-selected': isSelected,
                              onClick: () => onItemSelect(item),
                          };

                    return (
                        <ListItem
                            key={item.id}
                            {...item}
                            {...multiProps}
                            aria-label={undefined}
                            data-active={isActive || undefined}
                            owner="select"
                            tabIndex={-1} //show && isActive ? -1 : 0}
                            value={undefined}
                        />
                    );
                })}
            </Menu>
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
