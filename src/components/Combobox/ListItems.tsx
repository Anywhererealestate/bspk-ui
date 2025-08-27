import { Checkbox } from '-/components/Checkbox';
import { ListItem } from '-/components/ListItem';

type Item = {
    value: string;
    label: string;
    disabled?: boolean;
    trailing?: React.ReactNode;
};

export type ListItemsProps<I extends Item> = {
    /** Whether the listbox allows multiple selections. */
    isMulti?: boolean;
    /** The items to display in the listbox. */
    items?: I[];
    /** The index of the currently active item. */
    activeIndex?: number;
    /** The values that are currently selected. */
    selectedValues?: string[];
    /** Callback function when the selected values change. */
    onChange?: (nextSelectedValues: string[], event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    /** The label for the "Select All" option. */
    selectAll?: string | false;
    /** The ID of the menu for accessibility purposes. */
    menuId?: string;
    /** Whether all items are selected in a multi-select scenario. */
    allSelected?: boolean;
};

export function ListItems<I extends Item>({
    isMulti = false,
    items = [],
    activeIndex,
    selectedValues = [],
    onChange,
    selectAll = false,
    menuId = '',
    allSelected = false,
}: ListItemsProps<I>) {
    const multiSelectValue = (selected: boolean, itemValue: string) => {
        return selected ? selectedValues.filter((value) => value !== itemValue) : [...selectedValues, itemValue];
    };

    return (
        <>
            {isMulti && selectAll && (
                <ListItem
                    as="label"
                    data-selected={allSelected || undefined}
                    key="select-all"
                    label={selectAll}
                    onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
                        onChange?.(allSelected ? [] : items.map((item) => item.value), event);
                    }}
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
            {items.map((item, index) => {
                const selected = Boolean(Array.isArray(selectedValues) && selectedValues.includes(item.value));
                return (
                    <ListItem
                        {...item}
                        active={activeIndex === index || undefined}
                        aria-disabled={item.disabled || undefined}
                        aria-selected={selected || undefined}
                        as={isMulti ? 'label' : 'button'}
                        disabled={item.disabled || undefined}
                        id={`${menuId}-item-${index}`}
                        key={`${menuId}-item-${index}`}
                        label={item.label}
                        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            onChange?.(isMulti ? multiSelectValue(selected, item.value) : [item.value], event);
                        }}
                        tabIndex={-1}
                        trailing={
                            isMulti ? (
                                <Checkbox
                                    aria-label={item.label}
                                    checked={selected}
                                    name={item.value}
                                    onChange={(checked) => {
                                        onChange?.(multiSelectValue(checked, item.value));
                                    }}
                                    value={item.value}
                                />
                            ) : (
                                item.trailing || undefined
                            )
                        }
                    />
                );
            })}
        </>
    );
}
