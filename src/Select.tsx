import './select.scss';
import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { useMemo } from 'react';

import { ListItem } from './ListItem';
import { Listbox, ListboxProps } from './Listbox';
import { Tooltip } from './Tooltip';
import { useCombobox } from './hooks/useCombobox';
import { Placement } from './hooks/useFloating';
import { useId } from './hooks/useId';
import { useTruncatedText } from './hooks/useTruncatedText';

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
 * @phase DesignReview
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

    const { toggleProps, menuProps, closeMenu, elements } = useCombobox({
        placement: 'bottom-start',
        disabled,
        invalid,
        readOnly,
        errorMessage,
        offsetOptions: 4,
    });

    const selectLabel = useMemo(
        () =>
            isMulti
                ? `${selected?.length || 0} option${selected?.length !== 1 ? 's' : ''} selected`
                : options.find((o) => o.value === selected?.[0])?.label,
        [isMulti, options, selected],
    );

    const { setElement, isTruncated } = useTruncatedText();

    return (
        <>
            <input defaultValue={selected} name={name} type="hidden" />
            <Tooltip disabled={!isTruncated} label={selectLabel || placeholder}>
                <button
                    aria-label={ariaLabel || selectLabel || placeholder}
                    data-bspk="select"
                    data-empty={selectLabel ? undefined : ''}
                    data-invalid={invalid || undefined}
                    data-size={size}
                    disabled={disabled || readOnly}
                    id={id}
                    ref={elements.setReference}
                    style={styleProp}
                    {...toggleProps}
                >
                    <ListItem
                        as="span"
                        data-placeholder
                        innerRef={(node) => {
                            if (node) setElement(node.querySelector<HTMLElement>('[data-text]'));
                        }}
                        label={selectLabel || placeholder}
                        readOnly
                    />
                    <span data-icon>
                        <SvgChevronRight />
                    </span>
                </button>
            </Tooltip>
            <Listbox
                data-floating
                innerRef={elements.setFloating}
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
        </>
    );
}

Select.bspkName = 'Select';

export { Select };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
