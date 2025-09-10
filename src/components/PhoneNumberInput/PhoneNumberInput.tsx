import { SvgIcon } from '@bspk/icons/SvgIcon';
import { AsYouType, getCountryCallingCode } from 'libphonenumber-js';
import { useMemo, useState } from 'react';

import { Divider } from '-/components/Divider';
import { ListItemMenu, MenuListItem } from '-/components/ListItemMenu';
import { TextInput, TextInputProps } from '-/components/TextInput';
import { FormFieldControlProps } from '-/types/common';
import { countryCodeData, countryCodes, SupportedCountryCode } from '-/utils/countryCodes';
import { guessUserCountryCode } from '-/utils/guessUserCountryCode';

import './phone-number-input.scss';

const SELECT_OPTIONS: MenuListItem[] = countryCodes.map((code) => {
    const countryCodeDetails = countryCodeData[code];
    return {
        id: code,
        label: `${countryCodeDetails?.name}`,
        leading: countryCodeDetails?.flagIconName ? <SvgIcon name={countryCodeDetails?.flagIconName} /> : null,
        trailing: `(+${getCountryCallingCode(code)})`,
    };
});

export type PhoneNumberInputProps = FormFieldControlProps &
    Pick<
        TextInputProps,
        | 'aria-label'
        | 'autoComplete'
        | 'disabled'
        | 'inputRef'
        | 'invalid'
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
 * A text input that allows users to enter text phone numbers with country codes.
 *
 * This is the base element and if used must contain the field label contextually. This will more often be used in the
 * PhoneNumberField component.
 *
 * @example
 *     <PhoneNumberInput aria-label="Phone Number" initialCountryCode="US" value={value} onChange={onChange} />;
 *
 * @name PhoneNumberInput
 * @phase UXReview
 */
export function PhoneNumberInput({
    value,
    onChange,
    disableFormatting,
    initialCountryCode,
    disabled,
    readOnly,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    ...inputProps
}: PhoneNumberInputProps) {
    const [countryCode, setCountryCode] = useState<SupportedCountryCode>(initialCountryCode || guessUserCountryCode());

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

    return (
        <ListItemMenu
            items={({ setShow }) =>
                SELECT_OPTIONS.map((option) => {
                    return {
                        ...option,
                        selected: option.id === countryCode,
                        onClick: () => {
                            setCountryCode(option.id as SupportedCountryCode);
                            setShow(false);
                        },
                        includeAriaLabel: false,
                    };
                })
            }
            menuRole="listbox"
            menuWidth="reference"
            scrollLimit={10}
        >
            {(toggleProps, { setRef }) => {
                return (
                    <div data-bspk="phone-number-input" ref={setRef}>
                        <TextInput
                            {...inputProps}
                            aria-describedby={ariaDescribedBy}
                            aria-errormessage={ariaErrorMessage}
                            data-bskp-owner="phone-number-input"
                            disabled={disabled}
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
                                    <Divider orientation="vertical" />
                                    <span style={{ cursor: 'default' }}>{`+${callingCode}`}</span>
                                </div>
                            }
                            onChange={handleChange}
                            readOnly={readOnly}
                            value={value}
                        />
                    </div>
                );
            }}
        </ListItemMenu>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
