import './otp-input.scss';
import { useState } from 'react';
import { useId } from '-/hooks/useId';
import { CommonProps } from '-/types/common';
import { handleKeyDown } from '-/utils/handleKeyDown';

export type OTPInputProps = CommonProps<'aria-label' | 'id' | 'invalid' | 'name' | 'size'> & {
    /**
     * The value of the otp-input.
     *
     * @example
     *     867530;
     *
     * @required
     */
    value: string;
    /**
     * Callback when the value changes.
     *
     * @required
     */
    onChange: (value: string) => void;
    /**
     * The length of the otp-input.
     *
     * @default 6
     * @maximum 10
     */
    length?: number;
    /**
     * The mode of the otp-input.
     *
     * @default false
     */
    alphanumeric?: boolean;
};

/**
 * A row of input fields that are used to input a temporary secure pin code sent to the customer.
 *
 * @example
 *     import { OTPInput } from '@bspk/ui/OTPInput';
 *
 *     () => {
 *         const [otpValue, setOtpValue] = useState('');
 *
 *         return <OTPInput name="2-auth" length={6} value={otpValue} onChange={setOtpValue} alphanumeric={false} />;
 *     };
 *
 * @name OTPInput
 * @phase Stable
 */
export function OTPInput({
    value: valueProp,
    onChange,
    name,
    id: idProp,
    length: maxLength = 6,
    size = 'medium',
    invalid = false,
    alphanumeric = false,
    'aria-label': ariaLabel = 'OTP input',
}: OTPInputProps) {
    const id = useId(idProp);
    const value = valueProp?.toUpperCase() || '';

    const [inputs, setInputs] = useState<HTMLInputElement[]>([]);

    const onChangeInput = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const digitAdded = event.target.value.trim().toUpperCase();

        const values = value.split('');
        values[index] = digitAdded;

        onChange(values.join('').substring(0, maxLength));

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

    const canBeFocused = (index: number) => {
        // if the input is the first one, it can be focused
        if (index === 0) return true;

        // if the input currently has a value, it can be focused
        if (value[index]) return true;

        // if the input is empty but it's the next one to be filled, it can be focused
        if (index === value.length) return true;

        return false;
    };

    const Backspace = (event: React.KeyboardEvent) => {
        // If the input has a value, clear it and maintain focus.
        // Otherwise, focus the previous input and focus/select it.

        const input = event.target as HTMLInputElement;
        const digitIndex = input.dataset.digit;

        if (!input.value) {
            const prevInput = inputs[Number(digitIndex) - 1];
            prevInput?.focus();
        }
    };

    return (
        <div data-bspk="otp-input" data-invalid={invalid || undefined} data-size={size || 'medium'} id={id}>
            <span data-digits role="group">
                {Array.from({ length: maxLength }, (_, index) => (
                    <input
                        aria-label={`${ariaLabel} digit ${index + 1}`}
                        autoComplete="off"
                        data-digit={index}
                        inputMode={alphanumeric ? 'text' : 'numeric'}
                        key={index}
                        maxLength={1}
                        name={name}
                        onChange={onChangeInput(index)}
                        onFocus={(event) => {
                            // only permit focus if the input is the next empty one OR already filled
                            (event.target as HTMLInputElement)?.select();
                        }}
                        onKeyDown={handleKeyDown(
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
                        )}
                        onMouseDown={(event) => {
                            // only permit focus if the input is the next empty one OR already filled

                            const input = event.target as HTMLInputElement;

                            if (!input.value) {
                                inputs[value.length]?.focus();
                                event.preventDefault();
                                return;
                            }
                            input.select();
                        }}
                        onPaste={(event) => {
                            const pastedData = event.clipboardData.getData('text').trim().toUpperCase();
                            // add pasted data from this index onward into the inputs and send to onChange
                            onChange((value.substring(0, index) + pastedData).substring(0, maxLength));
                        }}
                        ref={(input) => {
                            if (input && !inputs.includes(input)) {
                                setInputs((prev) => {
                                    prev[index] = input;
                                    return [...prev];
                                });
                            }
                        }}
                        tabIndex={canBeFocused(index) ? 0 : -1}
                        type="text"
                        value={value[index] || ''}
                    />
                ))}
            </span>
        </div>
    );
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
