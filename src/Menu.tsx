import './menu.scss';
import { ComponentProps, CSSProperties, ReactNode, useMemo } from 'react';

import { Checkbox } from './Checkbox';
import { ListItem } from './ListItem';
import { useId } from './hooks/useId';

import { CommonProps, ElementProps, SetRef } from './';

const DEFAULT = {
    selectAll: 'Select All',
};

export const MIN_ITEM_COUNT = 3;
export const MAX_ITEM_COUNT = 10;

export function menuItemId(menuId: string, index: number) {
    return `menu-${menuId}-item-${index}`;
}

/** The props for the renderListItem function. Useful for customizing menu list items. */
export type RenderListItemParams<T extends MenuItem = MenuItem> = Pick<
    MenuProps<T>,
    'activeIndex' | 'isMulti' | 'selectedValues'
> & {
    index: number;
    item: T;
    menuId: string;
    selected: boolean;
    itemId?: string;
};

/** The props for the menu items. */
export type MenuItem = CommonProps<'disabled'> & {
    /** The content to display in the menu item. */
    label: string;
    /** The value of the menu item. */
    value: string;
    /** The unique id of the menu item. */
    id?: string;
    /** The leading element to display. */
    leading?: ReactNode | null;
};

export type MenuProps<T extends MenuItem = MenuItem> = CommonProps<'disabled' | 'id'> & {
    /**
     * The number of items to display in the menu
     *
     * @default 5
     * @minimum 3
     * @maximum 10
     */
    itemCount?: number;
    /**
     * Content to display in the menu.
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
    items?: T[];
    /** A ref to the inner div element. */
    innerRef?: SetRef<HTMLDivElement>;
    /** Message to display when no results are found */
    noResultsMessage?: ReactNode;
    /**
     * The index of the currently highlighted item.
     *
     * @default undefined
     */
    activeIndex?: number;
    /** The values of the selected items */
    selectedValues?: string[];
    /**
     * A function which given data about the list item returns additional list item props used to render the list items.
     *
     * @type (props: RenderListItemParams) => ComponentProps<typeof ListItem>;
     * @param {RenderListItemParams} props
     * @returns {ComponentProps<typeof ListItem>}
     */
    renderListItem?: (props: RenderListItemParams<T>) => Partial<ComponentProps<typeof ListItem>>;
    /**
     * Whether the menu allows multiple selections.
     *
     * @default false
     */
    isMulti?: boolean;
    /**
     * The label for the "Select All" option.
     *
     * Ignored if `isMulti` is false.
     *
     * If `isMulti` is `true`, defaults to "Select All". If a string, it will be used as the label. If false the select
     * all option will not be rendered.
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
    onChange?: (selectedValues: string[], event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

/**
 * A container housing a simple list of options presented to the user to select one option at a time.
 *
 * @example
 *     import React from 'react';
 *
 *     import { Menu } from '@bspk/ui/Menu';
 *
 *     export function Example() {
 *         const [selected, setSelected] = React.useState<string[]>([]);
 *
 *         return (
 *             <Menu
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
 * @name Menu
 */
function Menu({
    itemCount: itemCountProp = 5,
    items: itemsProp = [],
    noResultsMessage,
    innerRef,
    onChange,
    activeIndex,
    selectedValues = [],
    disabled,
    id: idProp,
    renderListItem,
    isMulti,
    selectAll: selectAllProp,
    ...props
}: ElementProps<MenuProps, 'div'>) {
    const menuId = useId(idProp);

    const selectAll = useMemo(() => {
        if (!isMulti) return false;
        if (selectAllProp && typeof selectAllProp === 'string') return selectAllProp;
        return selectAllProp === true ? DEFAULT.selectAll : false;
    }, [isMulti, selectAllProp]);

    const { items, itemCount } = useMemo(() => {
        const itemsNext = Array.isArray(itemsProp) ? itemsProp : [];
        return {
            items: itemsNext,
            // Ensure itemCount is within the range of items.length
            itemCount: Math.min(
                itemsNext.length,
                // pin itemCountProp to a range of 3 to 10
                Math.max(MIN_ITEM_COUNT, Math.min(itemCountProp, MAX_ITEM_COUNT)),
            ),
        };
    }, [itemCountProp, itemsProp]);

    const allSelected = useMemo(
        () => !!(items.length && items.every((item) => selectedValues.includes(item.value))),
        [items, selectedValues],
    );

    return (
        <div
            {...props}
            aria-multiselectable={isMulti || undefined}
            data-bspk="menu"
            data-disabled={disabled || undefined}
            data-item-count={itemCount || undefined}
            data-no-items={!items.length || undefined}
            id={menuId}
            ref={innerRef}
            role="listbox"
            style={{ ...props.style, '--item-count': itemCount } as CSSProperties}
        >
            {isMulti && selectAll && (
                <ListItem
                    as="button"
                    data-selected={allSelected || undefined}
                    key="select-all"
                    label={selectAll}
                    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        onChange?.(allSelected ? [] : items.map((item) => item.value), event);
                    }}
                    role="option"
                    tabIndex={-1}
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
            {items.length
                ? items.map((item, index) => {
                      const itemId = item.id || menuItemId(menuId, index);

                      const selected = Boolean(Array.isArray(selectedValues) && selectedValues.includes(item.value));

                      const renderProps = renderListItem?.({
                          activeIndex,
                          index,
                          item,
                          selectedValues,
                          isMulti,
                          menuId: menuId || '',
                          selected,
                          itemId,
                      });

                      return (
                          <ListItem
                              {...renderProps}
                              active={activeIndex === index || undefined}
                              aria-disabled={item.disabled || undefined}
                              aria-posinset={index + 1}
                              aria-selected={selected || undefined}
                              as="button"
                              //data-selected={selected || undefined}
                              disabled={item.disabled || undefined}
                              id={itemId}
                              key={itemId}
                              label={renderProps?.label?.toString() || item.label?.toString()}
                              leading={item.leading ?? renderProps?.leading}
                              onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                  if (renderProps) renderProps?.onClick?.(event);

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
                              tabIndex={-1}
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
                                      renderProps?.trailing
                                  )
                              }
                          />
                      );
                  })
                : noResultsMessage}
        </div>
    );
}

Menu.bspkName = 'Menu';

export { Menu };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
