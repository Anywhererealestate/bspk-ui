import './otp-input.scss';
import { SvgCircleFill } from '@bspk/icons/CircleFill';
import { useState } from 'react';
import { useId } from '-/hooks/useId';
import { CommonProps, FieldControlProps } from '-/types/common';
import { handleKeyDown } from '-/utils/handleKeyDown';

export type OTPInputProps = CommonProps<'size'> &
    Omit<FieldControlProps, 'onChange' | 'value'> & {
        /**
         * The required length of the otp-input.
         *
         * @default 6
         * @maximum 10
         */
        length?: number;
        /**
         * When true, the input accepts both letters and numbers.
         *
         * @default false
         */
        alphanumeric?: boolean;
        /**
         * When true the input masks the entered characters.
         *
         * @default false
         */
        secure?: boolean;
        /**
         * The default value of the input.
         *
         * @remarks
         *   This prop is used to set the initial value of the OTP input fields when the component is first rendered. It
         *   should be a string containing characters that match the expected input type (numeric or alphanumeric) and
         *   should not exceed the specified length of the OTP input.
         */
        defaultValue?: string;
        /** Callback function that is called when the value of the OTP input has reached the complete length. */
        onChange?: (value: string) => void;
    };

/**
 * A row of input fields that are used to input a temporary secure pin code sent to the customer.
 *
 * For a more complete example with field usage, see the OTPInputField component.
 *
 * @example
 *     import { OTPInput } from '@bspk/ui/OTPInput';
 *
 *     () => {
 *         return (
 *             <OTPInput
 *                 name="2-auth"
 *                 maxLength={6}
 *                 defaultValue="8675"
 *                 onChange={(value) => {
 *                     // add a debounced API call to verify the OTP here
 *                     console.log('OTP value:', value);
 *                 }}
 *                 alphanumeric={false}
 *             />
 *         );
 *     };
 *
 * @name OTPInput
 * @phase Stable
 */
export function OTPInput({
    defaultValue = '',
    onChange,
    name,
    id: idProp,
    length: requiredLength = 6,
    size = 'medium',
    invalid = false,
    alphanumeric = false,
    'aria-label': ariaLabel = 'OTP input',
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    disabled = false,
    readOnly = false,
    required = false,
    secure = false,
}: OTPInputProps) {
    const id = useId(idProp);
    const [values, setValuesState] = useState<string[]>(defaultValue?.split('') || []);

    const setValues = (newValues: string[] | ((prevValues: string[]) => string[])) => {
        const nextValues = typeof newValues === 'function' ? newValues(values) : newValues;
        setValuesState(nextValues);
        if (nextValues.join('').trim().length === requiredLength) onChange?.(nextValues.join('').trim());
    };

    const [inputs, setInputs] = useState<HTMLInputElement[]>([]);

    const onChangeInput = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const digitAdded = event.target.value.trim().toUpperCase();

        setValues((prev) => {
            const newValues = [...prev];
            newValues[index] = digitAdded;
            return newValues;
        });

        if (digitAdded) inputs[index + 1]?.focus();
    };

    const ArrowUpArrowLeft = (event: React.KeyboardEvent) => {
        // Focus the previous input and focus/select it if it exists

        const input = event.target as HTMLInputElement;
        const digitIndex = input.dataset.digit;
        const prevInput = inputs[Number(digitIndex) - 1];

        prevInput?.focus();
    };

    const ArrowDownArrowRight = (event: React.KeyboardEvent) => {
        // Focus the next input and focus/select it if it exists

        const input = event.target as HTMLInputElement;
        const digitIndex = input.dataset.digit;
        const nextInput = inputs[Number(digitIndex) + 1];

        // if the current input doesn't have a value, prevent focusing the next input and instead focus/select the current one
        if (!input.value) {
            input.focus();
            return;
        }

        nextInput?.focus();
    };

    const Backspace = (event: React.KeyboardEvent) => {
        // If the input has a value, clear it and maintain focus.
        // Otherwise, focus the previous input and focus/select it.

        const input = event.target as HTMLInputElement;
        const digitIndex = input.dataset.digit!;

        if (!input.value)
            // focus previous input if it exists and prevent default backspace behavior of navigating back
            inputs[Number(digitIndex) - 1]?.focus();

        input.value = '';

        setValues((prev) => {
            const newValues = [...prev];
            newValues[Number(digitIndex)] = '';
            return newValues;
        });
    };

    const canBeFocused = (index: number) => {
        // if the input is the first one, it can be focused
        if (index === 0) return true;

        // if the input currently has a value, it can be focused
        if (values[index]) return true;

        // if the input is empty but it's the next one to be filled, it can be focused
        if (index === values.length) return true;

        return false;
    };

    const firstInputProps = {
        'aria-describedby': ariaDescribedBy || undefined,
        'aria-errormessage': ariaErrorMessage || undefined,
        'aria-invalid': invalid || undefined,
        'aria-label': ariaLabel,
        id,
        name,
    };

    return (
        <div
            aria-labelledby={`${id}-label`}
            data-bspk="otp-input"
            data-disabled={disabled || undefined}
            data-invalid={invalid || undefined}
            data-readonly={readOnly || undefined}
            data-secure={secure || undefined}
            data-size={size || 'medium'}
            role="group"
        >
            <span data-digits role="group">
                {Array.from({ length: requiredLength }, (_, index) => (
                    <input
                        {...(index === 0
                            ? firstInputProps
                            : {
                                  name: `${name}-${index}`,
                              })}
                        aria-label={`${ariaLabel} digit ${index + 1}`}
                        autoComplete="off"
                        data-digit={index}
                        data-main-input={true}
                        disabled={disabled || undefined}
                        inputMode={alphanumeric ? 'text' : 'numeric'}
                        key={index}
                        maxLength={1}
                        onChange={onChangeInput(index)}
                        onFocus={(event) => {
                            // only permit focus if the input is the next empty one OR already filled
                            (event.target as HTMLInputElement)?.select();
                        }}
                        onKeyDown={(event) => {
                            // if alphanumeric is false, prevent non-numeric characters from being entered
                            if (!alphanumeric && event.key.length === 1 && !/^[0-9]$/.test(event.key)) {
                                event.preventDefault();
                                return;
                            }
                            handleKeyDown(
                                {
                                    Backspace,
                                    ArrowUp: ArrowUpArrowLeft,
                                    ArrowLeft: ArrowUpArrowLeft,
                                    ArrowDown: ArrowDownArrowRight,
                                    ArrowRight: ArrowDownArrowRight,
                                },
                                {
                                    preventDefault: true,
                                    stopPropagation: true,
                                },
                            )(event);
                        }}
                        onMouseDown={(event) => {
                            // only permit focus if the input is the next empty one OR already filled

                            const input = event.target as HTMLInputElement;

                            if (!input.value) {
                                inputs[values.length]?.focus();
                                event.preventDefault();
                                return;
                            }
                            input.select();
                        }}
                        onPaste={(event) => {
                            const pastedData = event.clipboardData.getData('text').trim().toUpperCase();
                            // add pasted data from this index onward into the inputs and send to onChange
                            setValues((prev) => {
                                const newValues = [...prev];
                                for (let i = 0; i < pastedData.length; i++) {
                                    if (index + i < requiredLength) {
                                        newValues[index + i] = pastedData[i];
                                    }
                                }
                                return newValues;
                            });
                            // focus the input after the last one that was pasted into
                            const lastPastedIndex = Math.min(index + pastedData.length, requiredLength - 1);
                            inputs[lastPastedIndex]?.focus();
                            event.preventDefault();
                        }}
                        readOnly={readOnly || undefined}
                        ref={(input) => {
                            if (input && !inputs.includes(input)) {
                                setInputs((prev) => {
                                    prev[index] = input;
                                    return [...prev];
                                });
                            }
                        }}
                        required={required || undefined}
                        tabIndex={canBeFocused(index) ? 0 : -1}
                        type={secure ? 'password' : 'text'}
                        value={values[index] || ''}
                    />
                ))}
            </span>
            {secure && (
                <span data-digits data-secure-dots>
                    {Array.from({ length: requiredLength }, (_, index) => (
                        <span data-dot key={index}>
                            {!!values[index]?.trim() && <SvgCircleFill />}
                        </span>
                    ))}
                </span>
            )}
        </div>
    );
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
