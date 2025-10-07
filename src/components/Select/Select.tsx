import './select.scss';
import { SvgKeyboardArrowDown } from '@bspk/icons/KeyboardArrowDown';
import { useMemo, KeyboardEvent, MouseEvent } from 'react';
import { ListItem, ListItemProps } from '-/components/ListItem';
import { Menu } from '-/components/Menu';
import { useArrowNavigation } from '-/hooks/useArrowNavigation';
import { useFloating } from '-/hooks/useFloating';
import { useId } from '-/hooks/useId';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { CommonProps, ElementProps, FormFieldControlProps } from '-/types/common';
import { getElementById } from '-/utils/dom';
import { handleKeyDown } from '-/utils/handleKeyDown';
import { scrollListItemsStyle, ScrollListItemsStyleProps } from '-/utils/scrollListItemsStyle';

/**
 * An option in a Select component.
 *
 * Essentially the props of ListItemProps. Except for `value` which is required.
 */
export type SelectOption = Omit<ListItemProps, 'id' | 'onClick' | 'subText' | 'value'> & { value: string };

export type SelectItem = SelectOption & { id: string };

export type SelectProps = CommonProps<'disabled' | 'id' | 'invalid' | 'name' | 'readOnly' | 'size'> &
    FormFieldControlProps &
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
        /**
         * Selected value
         *
         * @default ''
         */
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
         * The label for the select element, used for accessibility, and the dropdown modal header.
         *
         * @required
         */
        label: string;
        /**
         * Placeholder for the select
         *
         * @default 'Select one'
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
    value = '',
    onChange,
    label,
    placeholder = 'Select one',
    size = 'medium',
    disabled,
    id: idProp,
    invalid,
    readOnly,
    name,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    'aria-labelledby': ariaLabelledBy,
    scrollLimit,
    ...props
}: ElementProps<SelectProps, 'div'>) {
    const id = useId(idProp);
    const menuId = useMemo(() => `${id}-menu`, [id]);

    const { items, availableItems } = useMemo(() => {
        const nextItems = optionsProp.map(
            (item, index): SelectItem => ({
                ...item,
                id: `${id}-item-${index}`,
                'aria-label': item.label,
                'aria-selected': value.includes(item.value),
            }),
        );

        return { items: nextItems, availableItems: nextItems.filter((item) => !item.disabled) };
    }, [optionsProp, id, value]);

    const closeMenu = () => {
        setActiveElementId(null);
    };

    const selectedItem = useMemo(
        (): SelectItem | undefined => items.find((o) => o.value === value?.[0]),
        [items, value],
    );

    const { activeElementId, setActiveElementId, arrowKeyCallbacks } = useArrowNavigation({
        ids: availableItems.map((i) => i.id),
    });

    const open = Boolean(activeElementId);

    const { elements, floatingStyles } = useFloating({
        hide: !open,
        offsetOptions: 4,
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
            {!ariaLabelledBy && (
                <div data-sr-only id={`${id}-label`}>
                    {label}
                </div>
            )}
            <div
                {...props}
                aria-activedescendant={activeElementId || undefined}
                aria-autocomplete="list"
                aria-controls={activeElementId ? menuId : undefined}
                aria-describedby={ariaDescribedBy || undefined}
                aria-disabled={disabled || undefined}
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
            >
                <ListItem
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
                as="div"
                id={menuId}
                innerRef={elements.setFloating}
                label={label}
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
                    const isSelected = value.includes(item.value);

                    return (
                        <ListItem
                            key={item.id}
                            {...item}
                            active={isActive || undefined}
                            aria-label={undefined}
                            aria-selected={isSelected}
                            as="li"
                            onClick={() => {
                                if (item.disabled || item.readOnly) return;
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
