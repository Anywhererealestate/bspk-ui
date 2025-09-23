import './phone-number-input.scss';
import { SvgIcon } from '@bspk/icons/SvgIcon';
import { AsYouType, getCountryCallingCode } from 'libphonenumber-js';
import { useMemo, useState } from 'react';
import { Button } from '-/components/Button';
import { Divider } from '-/components/Divider';
import { ListItemMenu, MenuListItem } from '-/components/ListItemMenu';
import { TextInput, TextInputProps } from '-/components/TextInput';
import { useUIContext } from '-/hooks/useUIContext';
import { FormFieldControlProps } from '-/types/common';
import { countryCodeData, countryCodes, SupportedCountryCode } from '-/utils/countryCodes';
import { guessUserCountryCode } from '-/utils/guessUserCountryCode';

const SELECT_OPTIONS: MenuListItem[] = countryCodes.map((code) => {
    const countryCodeDetails = countryCodeData[code];
    return {
        id: code,
        label: `${countryCodeDetails?.name}`,
        leading: countryCodeDetails?.flagIconName ? (
            <SvgIcon aria-hidden name={countryCodeDetails?.flagIconName} />
        ) : null,
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
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    ...inputProps
}: PhoneNumberInputProps) {
    const [countryCode, setCountryCode] = useState<SupportedCountryCode>(initialCountryCode || guessUserCountryCode());

    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

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
        <ListItemMenu
            disabled={disabled || readOnly}
            items={({ setShow }) =>
                SELECT_OPTIONS.map((option) => {
                    return {
                        ...option,
                        selected: option.id === countryCode,
                        onClick: () => {
                            setCountryCode(option.id as SupportedCountryCode);
                            setShow(false);
                            sendAriaLiveMessage(`Selected country code ${option.label}`);
                            inputRef?.focus();
                        },
                    };
                })
            }
            label="Select country code"
            owner="phone-number-input"
            role="listbox"
            scrollLimit={10}
            width="reference"
        >
            {(toggleProps, { setRef }) => {
                return (
                    <TextInput
                        data-bspk="phone-number-input"
                        {...inputProps}
                        aria-describedby={ariaDescribedBy}
                        aria-errormessage={ariaErrorMessage}
                        aria-label={ariaLabel}
                        containerRef={setRef}
                        disabled={disabled}
                        inputRef={setInputRef}
                        leading={
                            <>
                                <Button
                                    label="Open country code menu"
                                    variant="tertiary"
                                    {...toggleProps}
                                    data-bspk="country-code-select"
                                    disabled={disabled || readOnly}
                                >
                                    <SvgIcon name={selectedCodeData.flagIconName} />
                                    <SvgIcon name="KeyboardArrowDown" />
                                </Button>
                                <Divider orientation="vertical" />
                                <span aria-hidden="true" style={{ cursor: 'default' }}>{`+${callingCode}`}</span>
                            </>
                        }
                        onChange={handleChange}
                        owner="phone-number-input"
                        readOnly={readOnly}
                        value={value}
                    />
                );
            }}
        </ListItemMenu>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
