import { SvgKeyboardArrowDown } from '@bspk/icons/KeyboardArrowDown';
import { SvgKeyboardArrowUp } from '@bspk/icons/KeyboardArrowUp';
import { SvgIcon } from '@bspk/icons/SvgIcon';
import { AsYouType, getCountryCallingCode } from 'libphonenumber-js';
import { useMemo, useState } from 'react';

import './phone-number-input.scss';

import { Divider } from './Divider';
import { FormField, FormFieldProps } from './FormField';
import { ListItem } from './ListItem';
import { Menu } from './Menu';
import { Modal } from './Modal';
import { Portal } from './Portal';
import { TextInput, TextInputProps } from './TextInput';
import { Txt } from './Txt';
import { useCombobox } from './hooks/useCombobox';
import { countryCodeData, countryCodes, SupportedCountryCode } from './utils/countryCodes';
import { guessUserCountryCode } from './utils/guessUserCountryCode';

import { InvalidPropsLibrary } from 'src';

export type PhoneNumberInputProps = InvalidPropsLibrary &
    Pick<
        TextInputProps,
        | 'autoComplete'
        | 'disabled'
        | 'inputRef'
        | 'leading'
        | 'name'
        | 'placeholder'
        | 'readOnly'
        | 'required'
        | 'size'
        | 'trailing'
        | 'type'
        | 'value'
    > &
    Pick<FormFieldProps, 'controlId' | 'errorMessage' | 'helperText' | 'label' | 'labelTrailing'> & {
        /**
         * The default country code to select when the component is rendered. If not provided, it will attempt to guess
         * based on the user's locale. If the guessed country code is not supported, it will default to 'US'.
         */
        initialCountryCode?: SupportedCountryCode;
    } & {
        onChange: (value: string, countryCode: SupportedCountryCode) => void;
    };

/**
 * A text input that allows users to enter text phone numbers with country codes.
 *
 * @example
 *     <PhoneNumberInput label="Phone Number" initialCountryCode="US" />;
 *
 * @name PhoneNumberInput
 */
function PhoneNumberInput({
    label,
    errorMessage: errorMessageProp,
    helperText,
    controlId,
    labelTrailing,
    required,
    value,
    onChange,
    initialCountryCode,
    ...inputProps
}: PhoneNumberInputProps) {
    const { countryCodeSelectOptions, defaultCountryCode } = useMemo(() => {
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

    const [countryCode, setCountryCode] = useState<SupportedCountryCode>(defaultCountryCode);

    const errorMessage = (!inputProps.readOnly && !inputProps.disabled && errorMessageProp) || undefined;

    const formattedValue = useMemo(() => {
        const formatter = new AsYouType(countryCode);

        return formatter.input(value || '');
    }, [value, countryCode]);

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

        onChange(rawNumber, countryCode);
    };

    const { toggleProps, menuProps, closeMenu } = useCombobox({
        placement: 'bottom',
        errorMessage,
        offsetOptions: 4,
    });

    const { ref, ...restToggleProps } = toggleProps;

    const showCountryCodeSelectMenu = menuProps.style.display !== 'none';

    return (
        <div data-bspk="phone-number-input" ref={ref}>
            <FormField
                controlId={controlId}
                errorMessage={errorMessage}
                helperText={helperText}
                label={label}
                labelTrailing={labelTrailing}
                required={required}
            >
                {(fieldProps) => (
                    <TextInput
                        onChange={handleChange}
                        value={formattedValue}
                        {...inputProps}
                        {...fieldProps}
                        aria-label={label}
                        id={controlId}
                        leading={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <button {...restToggleProps} data-bspk="country-code-select">
                                    <SvgIcon name={selectedCodeData.flagIconName} />

                                    <span data-icon>
                                        {showCountryCodeSelectMenu ? <SvgKeyboardArrowUp /> : <SvgKeyboardArrowDown />}
                                    </span>
                                </button>
                                <Portal>
                                    <Menu
                                        data-bspk-inner="country-code-select-menu"
                                        data-floating
                                        itemCount={countryCodeSelectOptions.length}
                                        items={countryCodeSelectOptions}
                                        onChange={(next, event) => {
                                            event?.preventDefault();
                                            closeMenu();
                                            setCountryCode(next[0] as SupportedCountryCode);
                                        }}
                                        selectedValues={[countryCode]}
                                        {...menuProps}
                                    />
                                </Portal>

                                <Divider orientation="vertical" />

                                <Txt>{`+${callingCode}`}</Txt>
                            </div>
                        }
                        required={required}
                    />
                )}
            </FormField>

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
        </div>
    );
}

PhoneNumberInput.bspkName = 'PhoneNumberInput';

export { PhoneNumberInput };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
