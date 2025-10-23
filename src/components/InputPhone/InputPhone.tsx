import './input-phone.scss';
import { SvgIcon } from '@bspk/icons/SvgIcon';
import { AsYouType, getCountryCallingCode } from 'libphonenumber-js';
import { useMemo, useRef, useState } from 'react';
import { Button } from '-/components/Button';
import { useFieldInit } from '-/components/Field';
import { InputElement, InputProps } from '-/components/Input';
import { ListItem } from '-/components/ListItem';
import { Menu } from '-/components/Menu';
import { useArrowNavigation } from '-/hooks/useArrowNavigation';
import { useFloating } from '-/hooks/useFloating';
import { useId } from '-/hooks/useId';
import { useOutsideClick } from '-/hooks/useOutsideClick';
import { useUIContext } from '-/hooks/useUIContext';
import { countryCodeData, countryCodes, SupportedCountryCode } from '-/utils/countryCodes';
import { getElementById } from '-/utils/dom';
import { guessUserCountryCode } from '-/utils/guessUserCountryCode';
import { handleKeyDown } from '-/utils/handleKeyDown';
import { scrollListItemsStyle, ScrollListItemsStyleProps } from '-/utils/scrollListItemsStyle';
import { useIds } from '-/utils/useIds';

const SELECT_OPTIONS = countryCodes.map((code) => {
    const countryCodeDetails = countryCodeData[code];
    return {
        value: code,
        label: `${countryCodeDetails?.name}`,
        countryCallingCode: getCountryCallingCode(code),
        flagIconName: countryCodeDetails?.flagIconName,
    };
});

export type InputPhoneProps = Pick<
    InputProps,
    'disabled' | 'id' | 'inputRef' | 'invalid' | 'name' | 'readOnly' | 'required' | 'size' | 'value'
> &
    ScrollListItemsStyleProps & {
        /**
         * The default country code to select when the component is rendered. If not provided, it will attempt to guess
         * based on the user's locale. If the guessed country code is not supported, it will default to 'US'. Based on
         * [ISO](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) 2-digit country codes.
         *
         * @type string
         */
        initialCountryCode?: SupportedCountryCode;
        /**
         * Disables formatting of the phone number input in the UI. values returned by `onChange` are always
         * unformatted.
         *
         * @type boolean
         */
        disableFormatting?: boolean;
        /** Handler for change events. Contains the raw phone number value and the selected country code. */
        onChange: (value: string, countryCode: SupportedCountryCode) => void;
    };

/**
 * An input that allows users to enter text phone numbers and select country codes for the phone number.
 *
 * This is the base element and if used must contain the field label contextually.
 *
 * For a more complete example with field usage, see the InputPhoneField component.
 *
 * @example
 *     import { InputPhone } from '@bspk/ui/InputPhone';
 *
 *     function ExampleStandalone() {
 *         const [value, onChange] = React.useState<number | undefined>();
 *
 *         return <InputPhone aria-label="Phone Number" initialCountryCode="US" value={value} onChange={onChange} />;
 *     }
 *
 *     function ExampleWithField() {
 *         const [value, onChange] = React.useState<number | undefined>();
 *
 *         return (
 *             <Field>
 *                 <FieldLabel>Example Input Phone</FieldLabel>
 *                 <InputPhone aria-label="Phone Number" initialCountryCode="US" value={value} onChange={onChange} />
 *                 <FieldDescription>
 *                     The phone input allows you to enter a phone number with country code.
 *                 </FieldDescription>
 *             </Field>
 *         );
 *     }
 *
 * @name InputPhone
 * @phase UXReview
 */
export function InputPhone({
    value,
    onChange,
    disableFormatting,
    initialCountryCode,
    disabled,
    readOnly,
    name,
    id: idProp,
    invalid: invalidProp,
    required,
    size = 'medium',
    inputRef,
    scrollLimit = 5,
}: InputPhoneProps) {
    const id = useId(idProp);
    const menuId = useMemo(() => `${id}-menu`, [id]);
    const { ariaDescribedBy, ariaErrorMessage } = useFieldInit({ required });
    const invalid = !readOnly && !disabled && (invalidProp || !!ariaErrorMessage);

    const items = useIds(`input-phone-${id}`, SELECT_OPTIONS);

    const [countryCode, setCountryCode] = useState<SupportedCountryCode>(initialCountryCode || guessUserCountryCode());

    const inputInternalRef = useRef<HTMLInputElement | null>(null);

    const { activeElementId, setActiveElementId, arrowKeyCallbacks } = useArrowNavigation({
        ids: items.map((i) => i.id),
    });

    const closeMenu = () => setActiveElementId(null);
    const open = Boolean(activeElementId);

    const { elements, floatingStyles } = useFloating({
        hide: !open,
        offsetOptions: 4,
        refWidth: true,
    });

    useOutsideClick({
        elements: [elements.floating, elements.reference],
        callback: () => closeMenu(),
        disabled: !open,
    });

    const spaceEnter = () => {
        if (!open) {
            elements.reference?.click();
            return;
        }
        if (activeElementId) getElementById(activeElementId)?.click();
    };

    const { callingCode, selectedCodeData } = useMemo(() => {
        const selectedValue = (countryCode || 'US') as SupportedCountryCode;
        const data = countryCodeData[selectedValue] ?? countryCodeData.US;
        return {
            callingCode: getCountryCallingCode(countryCode),
            selectedCodeData: data,
        };
    }, [countryCode]);

    const handleChange = (newValue: string) => {
        let rawNumber = newValue.replace(/\D/g, '');
        if (rawNumber === value) return;

        if (!disableFormatting) {
            const formatter = new AsYouType(countryCode);
            rawNumber = formatter.input(`${rawNumber}`);
        }

        onChange(rawNumber, countryCode);
    };

    const { sendAriaLiveMessage } = useUIContext();

    return (
        <>
            <div
                data-bspk="input-phone"
                onKeyDownCapture={handleKeyDown({
                    Tab: () => {
                        //  if (open) closeMenu();
                    },
                })}
            >
                <InputElement
                    aria-describedby={ariaDescribedBy}
                    aria-errormessage={ariaErrorMessage}
                    aria-label="Phone number input"
                    autoComplete="off"
                    containerRef={elements.setReference}
                    disabled={disabled}
                    id={id}
                    inputRef={(node) => {
                        inputRef?.(node);
                        inputInternalRef.current = node;
                    }}
                    invalid={invalid}
                    leading={
                        <>
                            <Button
                                aria-activedescendant={open ? activeElementId || undefined : undefined}
                                aria-controls={open ? menuId : undefined}
                                aria-disabled={disabled || undefined}
                                aria-expanded={open}
                                aria-haspopup="listbox"
                                aria-label="select country code"
                                aria-owns={menuId}
                                aria-readonly={readOnly || undefined}
                                disabled={disabled || readOnly}
                                label="Open country code menu"
                                name={`${name}-country-code`}
                                onClick={(event) => {
                                    const nextOpen = !open;
                                    if (nextOpen) {
                                        setActiveElementId(items[0]?.id || null);
                                    } else {
                                        setActiveElementId(null);
                                    }
                                    event.preventDefault();
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
                                        Escape: closeMenu,
                                        'Ctrl+Option+Space': spaceEnter,
                                    },
                                    { preventDefault: true, stopPropagation: true },
                                )}
                                role="combobox"
                                variant="tertiary"
                            >
                                <SvgIcon name={selectedCodeData.flagIconName} />
                                <SvgIcon name="KeyboardArrowDown" />
                            </Button>
                            <span aria-hidden="true" style={{ cursor: 'default' }}>{`+${callingCode}`}</span>
                        </>
                    }
                    name={name}
                    onChange={handleChange}
                    owner="input-phone"
                    readOnly={readOnly}
                    required={required}
                    size={size}
                    value={value}
                />
            </div>
            {open && (
                <Menu
                    aria-autocomplete={undefined}
                    aria-label="Select country code"
                    as="div"
                    id={menuId}
                    innerRef={elements.setFloating}
                    onClickCapture={() => {
                        // Prevent the menu from closing when clicking inside it
                        // maintain focus on the select control
                        inputInternalRef.current?.focus();
                    }}
                    onFocus={() => {
                        inputInternalRef.current?.focus();
                    }}
                    owner="input-phone"
                    role="listbox"
                    style={{
                        ...(open ? scrollListItemsStyle(scrollLimit, items.length) : {}),
                        ...floatingStyles,
                    }}
                    tabIndex={-1}
                >
                    {items.map(({ countryCallingCode, flagIconName, ...item }) => (
                        <ListItem
                            {...item}
                            active={item.id === activeElementId}
                            aria-selected={item.value === countryCode}
                            key={item.id}
                            leading={flagIconName ? <SvgIcon aria-hidden name={flagIconName} /> : null}
                            onClick={() => {
                                setCountryCode(item.value as SupportedCountryCode);
                                sendAriaLiveMessage(`Selected country code ${item.label}`);
                                closeMenu();
                                inputInternalRef.current?.focus();
                            }}
                            role="option"
                            trailing={`(+${countryCallingCode})`}
                        />
                    ))}
                </Menu>
            )}
        </>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
