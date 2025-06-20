import './select.scss';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';

import { ListItem } from './ListItem';
import { Listbox, ListboxProps } from './Listbox';
import { Portal } from './Portal';
import { useCombobox } from './hooks/useCombobox';
import { Placement } from './hooks/useFloating';
import { useId } from './hooks/useId';

import { CommonProps, InvalidPropsLibrary } from './';

export type SelectOption = Record<string, unknown> & {
    /** The value of the option. */
    value: string;
    /** The label of the option. This is the text that will be displayed on the option. */
    label: string;
};

export type SelectProps<T extends SelectOption = SelectOption> = CommonProps<
    'aria-label' | 'disabled' | 'id' | 'name' | 'readOnly' | 'size'
> &
    InvalidPropsLibrary &
    Pick<ListboxProps<T>, 'isMulti' | 'itemDisplayCount' | 'listItemProps' | 'selectAll'> & {
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
         * Array of selected values
         *
         * @type Array<string>
         */
        value?: Array<string>;
        /**
         * Placeholder for the select
         *
         * @default Select one...
         */
        placeholder?: string;
        /**
         * The placement of the select menu. Will be ignored if the menu is too close to the edge of the screen.
         *
         * @default bottom
         */
        placement?: Extract<Placement, 'bottom' | 'top'>;
        /** The style of the select. */
        style?: React.CSSProperties;
        /**
         * The function to call when the selected values change.
         *
         * @required
         */
        onChange?: (value: string[], event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    };

/**
 * A field element that allows users to select one option from a list of available choices. *
 *
 * @example
 *     import { Select } from '@bspk/ui/Select';
 *
 *     export function Example() {
 *         const [selected, setSelected] = React.useState<string[]>([]);
 *         return (
 *             <Select
 *                 aria-label="Select an option"
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
 */
function Select({
    options = [],
    value: selected,
    onChange,
    'aria-label': ariaLabel,
    placeholder = 'Select...',
    size = 'medium',
    itemDisplayCount: itemCount = 5,
    disabled,
    id: propId,
    invalid,
    errorMessage,
    readOnly,
    name,
    isMulti,
    listItemProps,
    style: styleProp,
    selectAll,
}: SelectProps) {
    const id = useId(propId);

    const { toggleProps, menuProps, closeMenu } = useCombobox({
        placement: 'bottom',
        disabled,
        invalid,
        readOnly,
        errorMessage,
        offsetOptions: 4,
    });

    const selectLabel = isMulti
        ? `${selected?.length || 0} option${selected?.length !== 1 ? 's' : ''} selected`
        : options.find((o) => o.value === selected?.[0])?.label;

    return (
        <>
            <input defaultValue={selected} name={name} type="hidden" />
            <button
                aria-label={ariaLabel}
                data-bspk="select"
                data-empty={selectLabel ? undefined : ''}
                data-invalid={invalid || undefined}
                data-size={size}
                disabled={disabled || readOnly}
                id={id}
                style={styleProp}
                {...toggleProps}
            >
                <ListItem data-placeholder="" label={selectLabel || placeholder} readOnly />
                <span data-icon>
                    <SvgChevronRight />
                </span>
            </button>
            <Portal>
                <Listbox
                    data-floating
                    isMulti={isMulti}
                    itemDisplayCount={itemCount}
                    items={options}
                    listItemProps={listItemProps}
                    onChange={(next, event) => {
                        event?.preventDefault();
                        if (!isMulti) closeMenu();
                        onChange?.(next);
                    }}
                    selectAll={selectAll}
                    selectedValues={selected}
                    {...menuProps}
                />
            </Portal>
        </>
    );
}

Select.bspkName = 'Select';

export { Select };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
