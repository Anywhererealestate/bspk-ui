import { SvgChevronRight } from '@bspk/icons/ChevronRight';

import './dropdown.scss';
import { ListItem } from './ListItem';
import { Menu, MenuProps } from './Menu';
import { Portal } from './Portal';
import { Placement } from './hooks/useFloating';
import { useFloatingMenu } from './hooks/useFloatingMenu';
import { useId } from './hooks/useId';

import { CommonProps, InvalidPropsLibrary } from './';

export type DropdownOption = {
    /** The value of the option. */
    value: string;
    /** The label of the option. This is the text that will be displayed on the option. */
    label: string;
};

export type DropdownProps<O extends DropdownOption = DropdownOption> = CommonProps<
    'aria-label' | 'disabled' | 'id' | 'name' | 'readOnly' | 'size'
> &
    InvalidPropsLibrary &
    Pick<MenuProps<O>, 'isMulti' | 'itemCount' | 'onChange' | 'renderListItem'> & {
        /**
         * Array of options to display in the dropdown
         *
         * @type DropdownOption[]
         * @required
         */
        options: O[];
        /**
         * Array of selected values!
         *
         * @type Array<string>
         */
        value?: Array<string>;
        /**
         * Placeholder for the dropdown
         *
         * @default Select...
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
    };

/**
 * A field element that allows users to select one option from a list of available choices. *
 *
 * @name Dropdown
 */
function Dropdown<O extends DropdownOption = DropdownOption>({
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
}: DropdownProps<O>) {
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
                    onChange={(selectedValues, event) => {
                        event?.preventDefault();
                        if (!isMulti) closeMenu();
                        onChange?.(selectedValues);
                    }}
                    renderListItem={renderListItem}
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
