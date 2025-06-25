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
import { useResponsive } from './hooks/useResponsive';
import { countryCodeData, countryCodes, SupportedCountryCode } from './utils/countryCodes';
import { guessUserCountryCode } from './utils/guessUserCountryCode';

import { InvalidPropsLibrary } from 'src';

const useCountryCodeSelectOptions = (initialCountryCode?: SupportedCountryCode) => {
    return useMemo(() => {
        const selectOptions = countryCodes.map((code) => {
            const countryCodeDetails = countryCodeData[code];

            return {
                value: code,
                label: `${countryCodeDetails?.name} (+${getCountryCallingCode(code)})`,
                leading: countryCodeDetails?.flagIconName ? <SvgIcon name={countryCodeDetails?.flagIconName} /> : null,
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
         * based on the user's locale. If the guessed country code is not supported, it will default to 'US'.
         */
        initialCountryCode?: SupportedCountryCode;
        /**
         * Disables formatting of the phone number input in the UI. values returned by `onChange` are always
         * unformatted.
         */
        disableFormatting?: boolean;
        /** Handler for change events. Contains the raw phone number value and the selected country code. */
        onChange: (value: string, countryCode: SupportedCountryCode) => void;
    };

/**
 * A text input that allows users to enter text phone numbers with country codes.
 *
 * @example
 *     <PhoneNumberInput aria-label="Phone Number" initialCountryCode="US" value={value} onChange={onChange} />;
 *
 * @name PhoneNumberInput
 * @phase WorkInProgress
 */
function PhoneNumberInput({
    errorMessage,
    required,
    value,
    onChange,
    disableFormatting,
    initialCountryCode,
    'aria-label': ariaLabel,
    ...inputProps
}: PhoneNumberInputProps) {
    const { isMobile } = useResponsive();
    const {
        toggleProps,
        menuProps,
        closeMenu,
        elements,
        isOpen: showCountryCodeSelectMenu,
    } = useCombobox({
        placement: 'bottom',
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
                aria-label={ariaLabel}
                errorMessage={errorMessage}
                leading={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button {...(inputProps.disabled ? {} : toggleProps)} data-bspk="country-code-select">
                            <SvgIcon name={selectedCodeData.flagIconName} />

                            <SvgIcon name="KeyboardArrowDown" />
                        </button>

                        {isMobile ? (
                            <Modal
                                data-bspk-inner="country-code-select-modal"
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
                                    />
                                ))}
                            </Modal>
                        ) : (
                            <Listbox
                                data-bspk-inner="country-code-select-menu"
                                data-floating
                                innerRef={elements.setFloating}
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

                        <Txt>{`+${callingCode}`}</Txt>
                    </div>
                }
                required={required}
            />
        </div>
    );
}

PhoneNumberInput.bspkName = 'PhoneNumberInput';

export { PhoneNumberInput };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
