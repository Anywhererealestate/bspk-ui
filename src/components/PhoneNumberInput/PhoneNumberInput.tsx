import './phone-number-input.scss';
import { SvgIcon } from '@bspk/icons/SvgIcon';
import { AsYouType, getCountryCallingCode } from 'libphonenumber-js';
import { useMemo, useRef, useState } from 'react';
import { Button } from '-/components/Button';
import { ListItemMenu } from '-/components/ListItemMenu';
import { TextInput, TextInputProps } from '-/components/TextInput';
import { useId } from '-/hooks/useId';
import { useUIContext } from '-/hooks/useUIContext';
import { FormFieldControlProps } from '-/types/common';
import { COUNTRY_CODE_DATA, countryCodes, SupportedCountryCode } from '-/utils/countryCodes';
import { guessUserCountryCode } from '-/utils/guessUserCountryCode';
import { useIds } from '-/utils/useIds';

const SELECT_OPTIONS = countryCodes.map((code) => {
    const countryCodeDetails = COUNTRY_CODE_DATA[code];
    return {
        value: code,
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
        'disabled' | 'id' | 'inputRef' | 'invalid' | 'name' | 'readOnly' | 'required' | 'size' | 'value'
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
    id: idProp,
    name,
    ...inputProps
}: PhoneNumberInputProps) {
    const id = useId(idProp);

    const items = useIds(`phone-number-input-${id}`, SELECT_OPTIONS);

    const [countryCode, setCountryCode] = useState<SupportedCountryCode>(initialCountryCode || guessUserCountryCode());

    const inputRef = useRef<HTMLInputElement | null>(null);

    const { callingCode, selectedMeta } = useMemo(() => {
        const meta = COUNTRY_CODE_DATA[(countryCode || 'US') as SupportedCountryCode] ?? COUNTRY_CODE_DATA.US;
        return {
            callingCode: getCountryCallingCode(meta.code),
            selectedMeta: meta,
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

    const fauxInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <ListItemMenu
            disabled={disabled || readOnly}
            itemOnClick={({ currentId, setShow }) => {
                if (currentId) {
                    const item = items.find((i) => i.id === currentId)!;
                    setCountryCode(item.value as SupportedCountryCode);
                    sendAriaLiveMessage(`Selected country code ${item.label}`);
                    setShow(false);
                }
            }}
            items={({ show }) => {
                if (!show) return items.filter((item) => countryCode.includes(item.value));

                return items.map((item) => ({
                    ...item,
                    'aria-selected': item.value === countryCode,
                }));
            }}
            label="Select country code"
            onClose={() => {
                inputRef.current?.focus();
            }}
            owner="phone-number-input"
            role="listbox"
            scrollLimit={10}
            width="reference"
        >
            {(toggleProps, { setRef }) => {
                return (
                    <div data-bspk="phone-number-input">
                        <input hidden name={`${name}-country-code`} readOnly ref={fauxInputRef} value={countryCode} />
                        <TextInput
                            {...inputProps}
                            aria-describedby={ariaDescribedBy}
                            aria-errormessage={ariaErrorMessage}
                            aria-label={`phone number input with country code of ${selectedMeta.name}`}
                            autoComplete="off"
                            containerRef={setRef}
                            disabled={disabled}
                            id={id}
                            inputRef={(inputNode) => {
                                inputRef.current = inputNode;
                            }}
                            leading={
                                <>
                                    <Button
                                        {...toggleProps}
                                        disabled={disabled || readOnly}
                                        label="Open country code menu"
                                        onClick={(event) => {
                                            toggleProps.onClick?.(event);
                                            fauxInputRef.current?.focus();
                                            fauxInputRef.current?.click();
                                        }}
                                        variant="tertiary"
                                    >
                                        <SvgIcon aria-hidden name={selectedMeta.flagIconName} />
                                        <SvgIcon aria-hidden name="KeyboardArrowDown" />
                                    </Button>
                                    <span aria-hidden="true" style={{ cursor: 'default' }}>{`+${callingCode}`}</span>
                                </>
                            }
                            name={name}
                            onChange={handleChange}
                            owner="phone-number-input"
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
