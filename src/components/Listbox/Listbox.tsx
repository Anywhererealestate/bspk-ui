import { ReactNode, useMemo } from 'react';

import { Checkbox } from '-/components/Checkbox';
import { ListItem, ListItemProps } from '-/components/ListItem';
import { Menu, MenuProps } from '-/components/Menu';
import { useId } from '-/hooks/useId';
import { CommonProps, ElementProps, SetRef } from '-/types/common';

const DEFAULT = {
    selectAll: 'Select All',
};

/** The props for the listbox items. */
export type ListboxItemProps = CommonProps<'disabled'> &
    ListItemProps & {
        /** The content to display in the listbox item. */
        label: string;
        /** The value of the listbox item. */
        value: string;
    };

export type ListboxProps<Item extends ListboxItemProps = ListboxItemProps> = CommonProps<'disabled' | 'id'> &
    Pick<MenuProps, 'itemCount' | 'itemDisplayCount' | 'onOutsideClick' | 'owner'> & {
        /**
         * Content to display in the listbox.
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
         * @type Array<MenuItem>
         */
        items?: Item[];
        /** A ref to the inner div element. */
        innerRef?: SetRef<HTMLDivElement>;
        /**
         * The index of the currently highlighted item.
         *
         * @default undefined
         */
        activeIndex?: number;
        /** The values of the selected items */
        selectedValues?: string[];
        /** A function which returns additional ListItem props to apply to each ListItem. */
        listItemProps?: (props: { index: number; item: Item; selected: boolean }) => Partial<ListItemProps<'button'>>;
        /**
         * Whether the listbox allows multiple selections.
         *
         * @default false
         */
        isMulti?: boolean;
        /**
         * The label for the "Select All" option.
         *
         * Ignored if `isMulti` is false.
         *
         * If `isMulti` is `true`, defaults to "Select All". If a string, it will be used as the label. If false the
         * select all option will not be rendered.
         *
         * @default false
         */
        selectAll?: boolean | string;
        /**
         * The function to call when the selected values change.
         *
         * @example
         *     (selectedValues, event) => setState({ selectedValues });
         */
        onChange?: (selectedValues: string[], event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        /**
         * The children of the listbox added after the items.
         *
         * Usually only used for showing no items found.
         */
        children?: ReactNode;
        includeAriaLabel?: boolean;
    };

/**
 * A utility widget that allows users to select one or more items from a list of choices.
 *
 * @example
 *     import React from 'react';
 *
 *     import { ListBox } from '@bspk/ui/ListBox';
 *
 *     export function Example() {
 *         const [selected, setSelected] = React.useState<string[]>([]);
 *
 *         return (
 *             <ListBox
 *                 items={[
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
 *                 onChange={(selectedValues: string[]) => setSelected(selectedValues)}
 *                 selectedValues={selected}
 *             />
 *         );
 *     }
 *
 * @name Listbox
 * @phase Utility
 */
export function Listbox<Item extends ListboxItemProps>({
    includeAriaLabel,
    itemDisplayCount,
    itemCount,
    items = [],
    innerRef,
    onChange,
    activeIndex,
    selectedValues = [],
    disabled,
    id: idProp,
    listItemProps,
    isMulti,
    selectAll: selectAllProp,
    children,
    owner,
    ...props
}: ElementProps<ListboxProps<Item>, 'div'>) {
    const menuId = useId(idProp);

    const selectAll = useMemo(() => {
        if (!isMulti) return false;
        if (selectAllProp && typeof selectAllProp === 'string') return selectAllProp;
        return selectAllProp === true ? DEFAULT.selectAll : false;
    }, [isMulti, selectAllProp]);

    const allSelected = useMemo(
        () => !!(items.length && items.every((item) => selectedValues.includes(item.value))),
        [items, selectedValues],
    );

    return (
        <Menu
            {...props}
            aria-multiselectable={isMulti || undefined}
            data-bspk="listbox"
            data-bspk-owner={owner || undefined}
            data-disabled={disabled || undefined}
            data-no-items={!items.length || undefined}
            id={menuId}
            innerRef={innerRef}
            itemCount={itemCount || items.length}
            itemDisplayCount={itemDisplayCount || items.length}
            role="listbox"
        >
            {isMulti && selectAll && (
                <ListItem
                    as="label"
                    data-selected={allSelected || undefined}
                    id={`${menuId}-select-all`}
                    key="select-all"
                    label={selectAll}
                    onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
                        onChange?.(allSelected ? [] : items.map((item) => item.value), event);
                    }}
                    role="option"
                    trailing={
                        <Checkbox
                            aria-label={selectAll}
                            checked={!!allSelected}
                            indeterminate={!allSelected && selectedValues.length > 0}
                            name=""
                            onChange={(checked) => {
                                onChange?.(checked ? items.map((item) => item.value) : []);
                            }}
                            value=""
                        />
                    }
                />
            )}
            {items.map((item, index) => {
                const selected = Boolean(Array.isArray(selectedValues) && selectedValues.includes(item.value));

                const renderProps = listItemProps?.({
                    selected,
                    index,
                    item,
                });

                return (
                    <ListItem
                        {...item}
                        {...renderProps}
                        active={activeIndex === index || undefined}
                        aria-disabled={item.disabled || undefined}
                        aria-selected={selected || undefined}
                        as={isMulti ? 'label' : 'button'}
                        disabled={item.disabled || undefined}
                        id={`${menuId}-item-${index}`}
                        includeAriaLabel={includeAriaLabel}
                        key={`${menuId}-item-${index}`}
                        label={renderProps?.label?.toString() || item.label?.toString()}
                        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            if (onChange) {
                                if (!isMulti) {
                                    onChange?.([item.value], event);
                                    return;
                                }
                                onChange(
                                    selected
                                        ? selectedValues.filter((value) => value !== item.value)
                                        : [...selectedValues, item.value],
                                    event,
                                );
                            }
                        }}
                        role="option"
                        trailing={
                            isMulti ? (
                                <Checkbox
                                    aria-label={item.label}
                                    checked={selected}
                                    name={item.value}
                                    onChange={(checked) => {
                                        onChange?.(
                                            checked
                                                ? selectedValues.filter((value) => value !== item.value)
                                                : [...selectedValues, item.value],
                                        );
                                    }}
                                    value={item.value}
                                />
                            ) : (
                                renderProps?.trailing || item.trailing || undefined
                            )
                        }
                    />
                );
            })}
            {children}
        </Menu>
    );
}


/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
