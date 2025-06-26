import { SvgIcon } from '@bspk/icons/SvgIcon';
import { AsYouType, getCountryCallingCode } from 'libphonenumber-js';
import { useMemo, useState } from 'react';

import './phone-number-input.scss';

import { Divider } from './Divider';
import { ListItem } from './ListItem';
import { Listbox } from './Listbox';
import { Modal } from './Modal';
import { TextInput, TextInputProps } from './TextInput';
import { Txt } from './Txt';
import { useCombobox } from './hooks/useCombobox';
import { useUIContext } from './hooks/useUIContext';
import { countryCodeData, countryCodes, SupportedCountryCode } from './utils/countryCodes';
import { guessUserCountryCode } from './utils/guessUserCountryCode';

import { InvalidPropsLibrary } from 'src';

const useCountryCodeSelectOptions = (initialCountryCode?: SupportedCountryCode) => {
    return useMemo(() => {
        const selectOptions = countryCodes.map((code) => {
            const countryCodeDetails = countryCodeData[code];
            const callingCodeString = `(+${getCountryCallingCode(code)})`;

            return {
                value: code,
                label: `${countryCodeDetails?.name}`,
                leading: countryCodeDetails?.flagIconName ? <SvgIcon name={countryCodeDetails?.flagIconName} /> : null,
                trailing: <Txt>{callingCodeString}</Txt>,
            };
        });

        const defaultCode = initialCountryCode || guessUserCountryCode();

        return { countryCodeSelectOptions: selectOptions, defaultCountryCode: defaultCode };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export type PhoneNumberInputProps = InvalidPropsLibrary &
    Pick<
        TextInputProps,
        | 'aria-label'
        | 'autoComplete'
        | 'disabled'
        | 'inputRef'
        | 'name'
        | 'placeholder'
        | 'readOnly'
        | 'required'
        | 'size'
        | 'type'
        | 'value'
    > & {
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
 * A text input that allows users to enter text phone numbers with country codes. This is the base element and if used
 * directly you must wrap it with a label. This will more often be used in the PhoneNumberField component.
 *
 * @example
 *     <PhoneNumberInput aria-label="Phone Number" initialCountryCode="US" value={value} onChange={onChange} />;
 *
 * @name PhoneNumberInput
 * @phase WorkInProgress
 */
function PhoneNumberInput({
    errorMessage,
    value,
    onChange,
    disableFormatting,
    initialCountryCode,
    disabled,
    invalid,
    readOnly,
    ...inputProps
}: PhoneNumberInputProps) {
    const { isMobile } = useUIContext();
    const {
        toggleProps,
        menuProps,
        closeMenu,
        elements,
        isOpen: showCountryCodeSelectMenu,
    } = useCombobox({
        placement: 'bottom',
        disabled,
        invalid,
        readOnly,
        errorMessage,
    });

    const { countryCodeSelectOptions, defaultCountryCode } = useCountryCodeSelectOptions(initialCountryCode);

    const [countryCode, setCountryCode] = useState<SupportedCountryCode>(defaultCountryCode);

    const formattedValue = useMemo(() => {
        if (disableFormatting) {
            return value;
        }

        const formatter = new AsYouType(countryCode);

        return formatter.input(value || '');
    }, [value, countryCode, disableFormatting]);

    const { callingCode, selectedCodeData } = useMemo(() => {
        const selectedValue = (countryCode || 'US') as SupportedCountryCode;
        const data = countryCodeData[selectedValue] ?? countryCodeData.US;

        return {
            callingCode: getCountryCallingCode(countryCode),
            selectedCodeData: data,
        };
    }, [countryCode]);

    const handleChange = (newValue: string) => {
        const rawNumber = newValue.replace(/\D/g, '');
        if (rawNumber === value) return;

        onChange(rawNumber, countryCode);
    };

    const setRef = (el: HTMLDivElement | null) => {
        elements.setReference(el);
    };

    return (
        <div data-bspk="phone-number-input" ref={setRef}>
            <TextInput
                onChange={handleChange}
                value={formattedValue}
                {...inputProps}
                disabled={disabled}
                errorMessage={errorMessage}
                invalid={invalid}
                leading={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button
                            {...(disabled ? {} : toggleProps)}
                            aria-label="Open country code menu"
                            data-bspk="country-code-select"
                        >
                            <SvgIcon name={selectedCodeData.flagIconName} />

                            <SvgIcon name="KeyboardArrowDown" />
                        </button>

                        {isMobile ? (
                            <Modal
                                description="select a country code for your phone number"
                                header="Country Code"
                                onClose={closeMenu}
                                open={showCountryCodeSelectMenu}
                            >
                                {countryCodeSelectOptions.map((option) => (
                                    <ListItem
                                        active={countryCode === option.value}
                                        data-bspk="country-code-select-option"
                                        key={option.value}
                                        label={option.label}
                                        leading={option.leading}
                                        onClick={() => {
                                            setCountryCode(option.value as SupportedCountryCode);
                                            closeMenu();
                                        }}
                                        trailing={option.trailing}
                                    />
                                ))}
                            </Modal>
                        ) : (
                            <Listbox
                                data-floating
                                innerRef={elements.setFloating}
                                itemDisplayCount={countryCodeSelectOptions.length}
                                items={countryCodeSelectOptions}
                                onChange={(next, event) => {
                                    event?.preventDefault();
                                    closeMenu();
                                    setCountryCode(next[0] as SupportedCountryCode);
                                }}
                                selectedValues={[countryCode]}
                                {...menuProps}
                            />
                        )}

                        <Divider orientation="vertical" />

                        <span aria-label="Country code" style={{ cursor: 'default' }}>{`+${callingCode}`}</span>
                    </div>
                }
                readOnly={readOnly}
            />
        </div>
    );
}

PhoneNumberInput.bspkName = 'PhoneNumberInput';

export { PhoneNumberInput };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
