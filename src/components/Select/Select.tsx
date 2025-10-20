import './select.scss';
import { SvgKeyboardArrowDown } from '@bspk/icons/KeyboardArrowDown';
import { useMemo, KeyboardEvent, MouseEvent } from 'react';
import { FieldControlProp, useFieldInit } from '-/components/Field';
import { ListItem, ListItemProps } from '-/components/ListItem';
import { Menu } from '-/components/Menu';
import { useArrowNavigation } from '-/hooks/useArrowNavigation';
import { useFloating } from '-/hooks/useFloating';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { CommonProps, ElementProps } from '-/types/common';
import { getElementById } from '-/utils/dom';
import { handleKeyDown } from '-/utils/handleKeyDown';
import { scrollListItemsStyle, ScrollListItemsStyleProps } from '-/utils/scrollListItemsStyle';

/**
 * An option in a Select component.
 *
 * Essentially the props of ListItemProps.
 */
export type SelectOption = CommonProps<'disabled'> &
    Omit<ListItemProps, 'id' | 'onClick' | 'subText' | 'value'> & { value: string };

export type SelectItem = SelectOption & { id: string };

export type SelectProps = CommonProps<'name' | 'size'> &
    FieldControlProp &
    ScrollListItemsStyleProps & {
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
        /** Selected value */
        value: string;
        /**
         * The function to call when the selected values change.
         *
         * @example
         *     (value, event) => setState({ value });
         *
         * @required
         */
        onChange: (value: string, event?: KeyboardEvent | MouseEvent) => void;
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
 *             <Field>
 *                 <FieldLabel>Select an option</FieldLabel>
 *                 <Select
 *                     label="Select an option"
 *                     itemCount={5}
 *                     name="example-select"
 *                     onChange={setSelected}
 *                     options={[
 *                         { id: '1', label: 'Option 1' },
 *                         { id: '2', label: 'Option 2' },
 *                         { id: '3', label: 'Option 3' },
 *                         { id: '4', label: 'Option 4' },
 *                         { id: '5', label: 'Option 5' },
 *                         { id: '6', label: 'Option 6' },
 *                         { id: '7', label: 'Option 7' },
 *                         { id: '8', label: 'Option 8' },
 *                         { id: '9', label: 'Option 9' },
 *                         { id: '10', label: 'Option 10' },
 *                     ]}
 *                     placeholder="Select an option"
 *                     size="medium"
 *                     value={selected}
 *                 />
 *                 <FieldDescription>
 *                     The select allows you to choose one option from a list of options.
 *                 </FieldDescription>
 *             </Field>
 *         );
 *     }
 *
 * @name Select
 * @phase UXReview
 */
export function Select({
    options: optionsProp = [],
    value = '',
    onChange,
    placeholder = 'Select one',
    size = 'medium',
    disabled,
    id: idProp,
    invalid: invalidProp,
    readOnly,
    name,
    'aria-labelledby': ariaLabelledBy,
    scrollLimit,
    required: requiredProp,
    ...elementProps
}: ElementProps<SelectProps, 'button'>) {
    const {
        id,
        invalid: hasError,
        ariaDescribedBy,
        ariaErrorMessage,
    } = useFieldInit({
        id: idProp,
        readOnly,
        disabled,
        required: requiredProp,
        invalid: invalidProp,
    });
    const invalid = !readOnly && !disabled && (invalidProp || hasError);
    const menuId = useMemo(() => `${id}-menu`, [id]);

    const { items, availableItems } = useMemo(() => {
        const nextItems = optionsProp.map(
            (item, index): SelectItem => ({
                ...item,
                id: `${id}-item-${index}`,
                'aria-label': item.label,
                'aria-selected': value == item.value,
            }),
        );

        return { items: nextItems, availableItems: nextItems.filter((item) => !item.disabled) };
    }, [optionsProp, id, value]);

    const selectedItem = useMemo((): SelectItem | undefined => items.find((o) => o.value === value), [items, value]);

    const { activeElementId, setActiveElementId, arrowKeyCallbacks } = useArrowNavigation({
        ids: availableItems.map((i) => i.id),
    });

    const closeMenu = () => setActiveElementId(null);
    const open = Boolean(activeElementId);

    const { elements, floatingStyles } = useFloating({
        hide: !open,
        offsetOptions: 4,
        refWidth: true,
    });

    useOutsideClick({
        elements: [elements.floating, elements.reference],
        callback: closeMenu,
        disabled: !open,
    });

    const spaceEnter = () => {
        if (!open) {
            elements.reference?.click();
            return;
        }
        if (activeElementId) getElementById(activeElementId)?.click();
    };

    return (
        <>
            <input name={name} type="hidden" value={value} />
            <button
                {...elementProps}
                aria-activedescendant={activeElementId || undefined}
                aria-autocomplete="list"
                aria-controls={activeElementId ? menuId : undefined}
                aria-describedby={ariaDescribedBy || undefined}
                aria-disabled={disabled || readOnly || undefined}
                aria-errormessage={ariaErrorMessage || undefined}
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-labelledby={ariaLabelledBy || `${id}-label`}
                aria-readonly={readOnly || undefined}
                data-bspk="select"
                data-invalid={invalid || undefined}
                data-open={open || undefined}
                data-size={size}
                id={id}
                onBlur={(event) => {
                    const targetOutsideOfMenu =
                        event.relatedTarget && !elements.floating?.contains(event.relatedTarget as Element);
                    if (targetOutsideOfMenu) closeMenu();
                }}
                onClick={() => {
                    if (disabled || readOnly || !items.length) return;

                    if (!open) {
                        const nextActiveId = selectedItem?.id || items[0].id;
                        setActiveElementId(nextActiveId);
                        return;
                    }

                    closeMenu();
                }}
                onKeyDown={handleKeyDown(
                    {
                        ...arrowKeyCallbacks,
                        ArrowDown: (event) => {
                            if (!open) spaceEnter();
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
                type="button"
            >
                <ListItem
                    as="span"
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
            </button>
            <Menu
                aria-autocomplete={undefined}
                as="div"
                id={menuId}
                innerRef={elements.setFloating}
                onClickCapture={() => {
                    // Prevent the menu from closing when clicking inside it
                    // maintain focus on the select control
                    elements.reference?.focus();
                }}
                onFocus={() => {
                    elements.reference?.focus();
                }}
                owner="select"
                role="listbox"
                style={{
                    ...(open ? scrollListItemsStyle(scrollLimit, items.length) : {}),
                    ...floatingStyles,
                }}
                tabIndex={-1}
            >
                {items.map((item) => {
                    const isActive = activeElementId === item.id;
                    const isSelected = value === item.value;

                    return (
                        <ListItem
                            key={item.id}
                            {...item}
                            active={isActive || undefined}
                            aria-label={undefined}
                            aria-selected={isSelected}
                            as="li"
                            onClick={() => {
                                if (item.disabled) return;
                                onChange(item.value);
                                closeMenu();
                            }}
                            owner="select"
                            role="option"
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
