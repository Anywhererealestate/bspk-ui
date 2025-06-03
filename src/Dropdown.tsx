import { SvgChevronRight } from '@bspk/icons/ChevronRight';

import './dropdown.scss';
import { ListItem } from './ListItem';
import { Menu, MenuProps } from './Menu';
import { Portal } from './Portal';
import { Placement } from './hooks/useFloating';
import { useFloatingMenu } from './hooks/useFloatingMenu';
import { useId } from './hooks/useId';

import { CommonProps, InvalidPropsLibrary } from './';

export type DropdownOption = Record<string, unknown> & {
    /** The value of the option. */
    value: string;
    /** The label of the option. This is the text that will be displayed on the option. */
    label: string;
};

export type DropdownProps<T extends DropdownOption = DropdownOption> = CommonProps<
    'aria-label' | 'disabled' | 'id' | 'name' | 'readOnly' | 'size'
> &
    InvalidPropsLibrary &
    Pick<MenuProps<T>, 'isMulti' | 'itemCount' | 'renderListItem' | 'selectAll'> & {
        /**
         * Array of options to display in the dropdown
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
         * @type Array<DropdownOption>
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
         * Placeholder for the dropdown
         *
         * @default Select one...
         */
        placeholder?: string;
        /**
         * The placement of the dropdown menu. Will be ignored if the menu is too close to the edge of the screen.
         *
         * @default bottom
         */
        placement?: Extract<Placement, 'bottom' | 'top'>;
        /** The style of the dropdown. */
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
 *     import { Dropdown } from '@bspk/ui/Dropdown';
 *
 *     function Example() {
 *         const [selected, setSelected] = React.useState<string[]>([]);
 *         return (
 *             <Dropdown
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
 *                 value={selected}
 *                 onChange={setSelected}
 *                 placeholder="Select an option"
 *                 size="medium"
 *                 itemCount={5}
 *                 aria-label="Select an option"
 *             />
 *         );
 *     }
 *
 * @name Dropdown
 */
function Dropdown({
    options = [],
    value: selected,
    onChange,
    'aria-label': ariaLabel,
    placeholder = 'Select...',
    size = 'medium',
    itemCount = 5,
    disabled,
    id: propId,
    invalid,
    errorMessage,
    readOnly,
    placement = 'bottom',
    name,
    isMulti,
    renderListItem,
    style: styleProp,
    selectAll,
}: DropdownProps) {
    const id = useId(propId);

    const { triggerProps, menuProps, closeMenu } = useFloatingMenu({
        placement,
        triggerProps: {
            disabled,
            invalid,
            readOnly,
            errorMessage,
        },
    });

    const dropdownLabel = isMulti
        ? `${selected?.length || 0} option${selected?.length !== 1 ? 's' : ''} selected`
        : options.find((o) => o.value === selected?.[0])?.label;

    return (
        <>
            <input defaultValue={selected} name={name} type="hidden" />
            <button
                aria-label={ariaLabel}
                data-bspk="dropdown"
                data-empty={dropdownLabel ? undefined : ''}
                data-invalid={invalid || undefined}
                data-size={size}
                disabled={disabled || readOnly}
                id={id}
                style={styleProp}
                {...triggerProps}
            >
                <ListItem data-placeholder="" label={dropdownLabel || placeholder} readOnly />
                <span data-svg>
                    <SvgChevronRight />
                </span>
            </button>
            <Portal>
                <Menu
                    data-floating
                    isMulti={isMulti}
                    itemCount={itemCount}
                    items={options}
                    onChange={(next, event) => {
                        event?.preventDefault();
                        if (!isMulti) closeMenu();
                        onChange?.(next);
                    }}
                    renderListItem={renderListItem}
                    selectAll={selectAll}
                    selectedValues={selected}
                    {...menuProps}
                />
            </Portal>
        </>
    );
}

Dropdown.bspkName = 'Dropdown';

export { Dropdown };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
