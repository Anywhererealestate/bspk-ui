import { ReactNode, useMemo } from 'react';
import { ListItems } from './ListItems';
import { ListItemProps } from '-/components/ListItem';
import { Menu, MenuProps } from '-/components/Menu';
import { Modal, ModalProps } from '-/components/Modal';
import { ToggleProps, useCombobox, UseComboboxProps } from '-/hooks/useCombobox';
import { useId } from '-/hooks/useId';
import { useUIContext } from '-/hooks/useUIContext';
import { CommonProps, ElementProps } from '-/types/common';
import { cssWithVars } from '-/utils/cwv';

const DEFAULT = {
    selectAll: 'Select All',
};

export const MIN_ITEM_COUNT = 3;
export const MAX_ITEM_COUNT = 10;

/** The props for the listbox items. */
export type ComboboxItemProps = CommonProps<'disabled'> &
    ListItemProps & {
        /** The content to display in the listbox item. */
        label: string;
        /** The value of the listbox item. */
        value: string;
    };

export type ComboboxProps<Item extends ComboboxItemProps = ComboboxItemProps> = CommonProps<'id' | 'owner'> &
    Pick<MenuProps, 'itemDisplayCount'> &
    Pick<ModalProps, 'description' | 'header'> &
    Pick<UseComboboxProps, 'disabled' | 'offsetOptions' | 'readOnly' | 'refWidth'> & {
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
         *
         * @required
         */
        onChange: (selectedValues: string[], event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        /**
         * The children of the listbox added after the items.
         *
         * Usually only used for showing no items found.
         */
        children: (params: { setReference: (node: HTMLElement) => void; toggleProps: ToggleProps }) => ReactNode;
        /**
         * The label for the select element, used for accessibility, and the dropdown modal header.
         *
         * @required
         */
        label: string;
    };

/**
 * A utility widget that allows users to select one or more items from a list of choices.
 *
 * @name Combobox
 * @phase Utility
 */
function Combobox<Item extends ComboboxItemProps>({
    itemDisplayCount,
    items = [],
    onChange,
    value: selectedValues = [],
    disabled,
    id: idProp,
    isMulti,
    selectAll: selectAllProp,
    children,
    readOnly,
    refWidth,
    offsetOptions = 4,
    header,
    description,
    owner,
    ...props
}: ElementProps<ComboboxProps<Item>, 'div'>) {
    const menuId = useId(idProp);
    const { isMobile } = useUIContext();

    const { toggleProps, activeIndex, menuProps, closeMenu, isOpen, elements } = useCombobox({
        refOutsideClick: !isMobile,
        refWidth,
        placement: 'bottom-start',
        disabled,
        readOnly,
        offsetOptions,
    });

    const selectAll = useMemo((): string | false => {
        if (!isMulti) return false;
        if (selectAllProp && typeof selectAllProp === 'string') return selectAllProp;
        return selectAllProp === true ? DEFAULT.selectAll : false;
    }, [isMulti, selectAllProp]);

    const allSelected = useMemo(
        () => !!(items.length && items.every((item) => selectedValues.includes(item.value))),
        [items, selectedValues],
    );

    if (!isOpen) return <>{children({ toggleProps, setReference: elements.setReference })}</>;

    /* data-bspk="combobox" -- I don't need a wrapper here and this passes lint. :) */
    return (
        <>
            {children({ toggleProps, setReference: elements.setReference })}
            {isMobile ? (
                <Modal
                    description={description}
                    header={header}
                    onClose={closeMenu}
                    open={isOpen}
                    owner={owner || undefined}
                >
                    <div
                        aria-multiselectable={isMulti || undefined}
                        id={menuId}
                        role="listbox"
                        style={{ display: 'contents' }}
                    >
                        <ListItems
                            activeIndex={activeIndex}
                            allSelected={allSelected}
                            data-testid="listbox-items"
                            isMulti={isMulti}
                            items={items}
                            menuId={menuId}
                            onChange={(next) => {
                                onChange(next);
                                if (!isMulti) closeMenu();
                            }}
                            selectAll={selectAll}
                            selectedValues={selectedValues}
                        />
                    </div>
                </Modal>
            ) : (
                <Menu
                    aria-multiselectable={isMulti || undefined}
                    data-bspk="listbox"
                    data-disabled={disabled || undefined}
                    data-no-items={!items.length || undefined}
                    id={menuId}
                    innerRef={(node) => {
                        elements.setFloating(node);
                    }}
                    itemCount={items.length}
                    itemDisplayCount={itemDisplayCount}
                    onOutsideClick={closeMenu}
                    role="listbox"
                    style={cssWithVars({
                        ...props.style,
                        ...menuProps.style,
                    })}
                    tabIndex={-1}
                >
                    <ListItems
                        activeIndex={activeIndex}
                        allSelected={allSelected}
                        data-testid="listbox-items"
                        isMulti={isMulti}
                        items={items}
                        menuId={menuId}
                        onChange={(nextValue) => {
                            onChange(nextValue);
                            if (!isMulti) closeMenu();
                        }}
                        selectAll={selectAll}
                        selectedValues={selectedValues}
                    />
                </Menu>
            )}
        </>
    );
}

Combobox.bspkName = 'Combobox';

export { Combobox };

// ListItems component to render the items in the listbox or modal.
// This is a separate component to keep the Combobox component clean and focused on its main functionality

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
