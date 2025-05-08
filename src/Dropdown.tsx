import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { css } from '@emotion/react';

import { ListItem } from './ListItem';
import { Menu, MenuProps } from './Menu';
import { Portal } from './Portal';
import { Placement } from './hooks/useFloating';
import { useFloatingMenu } from './hooks/useFloatingMenu';
import { useId } from './hooks/useId';

import { CommonProps } from './';

export type DropdownOption = {
    /** The value of the option. */
    value: string;
    /** The label of the option. This is the text that will be displayed on the option. */
    label: string;
};

export type DropdownProps<O extends DropdownOption = DropdownOption> = CommonProps<
    'aria-label' | 'disabled' | 'id' | 'invalid' | 'name' | 'readOnly' | 'size'
> &
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
                css={style}
                data-dropdown=""
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

export const style = css`
    // default -- size medium not disabled or readonly
    --dropdown-background: var(--surface-neutral-t1-base);
    --dropdown-border-color: var(--stroke-neutral-base);
    --dropdown-text-color: var(--foreground-neutral-on-surface);
    --dropdown-height: var(--spacing-sizing-10);
    --dropdown-font: var(--body-base);
    --dropdown-clear-height: var(--spacing-sizing-05);
    --dropdown-padding: var(--spacing-sizing-03);
    --dropdown-icon-width: var(--spacing-sizing-05);

    position: relative;
    width: 100%;
    max-width: 280px;
    outline: unset;
    min-height: var(--dropdown-height);
    max-height: var(--dropdown-height);
    display: flex;
    flex-direction: row;
    gap: var(--spacing-sizing-02);
    flex-grow: 0;
    flex-shrink: 0;
    text-align: left;
    font: var(--dropdown-font);
    border: 1px solid var(--dropdown-border-color);
    border-radius: var(--radius-small);
    background: var(--dropdown-background);
    padding: 0 var(--dropdown-padding);

    [data-placeholder] {
        display: block;
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 0;

        [data-inner] {
            min-height: auto;
            padding: 0;
        }

        [data-item-label] [data-text] {
            color: var(--dropdown-text-color);
        }
    }

    [data-svg] {
        display: flex;
        flex-direction: column;
        justify-content: center;
        svg {
            transform: rotate(90deg);
            width: var(--dropdown-icon-width);
        }
    }

    // &[data-size='medium'] {
    & {
        [data-svg] svg {
        }
    }

    &[data-size='small'] {
        --dropdown-height: var(--spacing-sizing-08);
        --dropdown-font: var(--body-small);
        --dropdown-clear-height: var(--spacing-sizing-05);
        --dropdown-padding: var(--spacing-sizing-02);
        --dropdown-icon-width: var(--spacing-sizing-05);
    }

    &[data-size='large'] {
        --dropdown-height: var(--spacing-sizing-12);
        --dropdown-font: var(--body-large);
        --dropdown-clear-height: var(--spacing-sizing-06);
        --dropdown-icon-width: var(--spacing-sizing-06);
    }

    &:disabled {
        --dropdown-text-color: var(--foreground-neutral-disabled-on-surface);
        --dropdown-border-color: var(--stroke-neutral-disabled-light);
        --dropdown-background:
            linear-gradient(var(--interactions-disabled-opacity), var(--interactions-disabled-opacity)),
            linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));

        &[aria-readonly]:not([data-empty]) {
            --dropdown-text-color: var(--foreground-neutral-on-surface);
        }
    }

    &:not(:disabled) {
        &:focus {
            --dropdown-border-color: var(--stroke-brand-primary);
        }

        &:hover {
            --dropdown-background:
                linear-gradient(var(--interactions-neutral-hover-opacity), var(--interactions-neutral-hover-opacity)),
                linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
        }

        &:active {
            --dropdown-background:
                linear-gradient(var(--interactions-neutral-press-opacity), var(--interactions-neutral-press-opacity)),
                linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
        }
    }

    &[data-invalid] {
        --dropdown-border-color: var(--status-error);
    }

    &[data-empty] {
        --dropdown-text-color: var(--foreground-neutral-on-surface-variant-03);
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
