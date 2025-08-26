import { useEffect, useRef, useState } from 'react';
import { TextInputProps } from '-/components/TextInput';
import './otp-input.scss';

export type OTPInputProps = Pick<TextInputProps, 'disabled' | 'invalid' | 'onChange' | 'readOnly' | 'size' | 'value'>;

/**
 * A row of numerical input fields that are used to input a temporary secure pin code sent to the customer.
 *
 * @example
 *     import { OTPInput } from '@bspk/ui/OTPInput';
 *
 *     function Example() {
 *         const [value, setValue] = useState('');
 *
 *         return <OTPInput value={value} onChange={setValue} />;
 *     }
 *
 * @name OTPInput
 * @phase Dev
 */
function OTPInput({ value, onChange, size, disabled, invalid, readOnly }: OTPInputProps) {
    const [innerValue, setInnerValue] = useState<string[]>(Array(6).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (value && value !== innerValue.join('')) {
            const valueArray = value.split('');
            setInnerValue(valueArray.slice(0, 6));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const updateValue = (newValue: string[], focusIndex?: number) => {
        setInnerValue(newValue);
        onChange?.(newValue.join(''));
        if (focusIndex !== undefined) {
            inputRefs.current[focusIndex]?.focus();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const inputVal = e.target.value.replace(/\D/g, '');

        if (index === 0 && inputVal.length > 1) {
            const chars = inputVal.slice(0, 6).split('');
            updateValue(chars, Math.min(chars.length, inputRefs.current.length - 1));
        } else if (inputVal.length === 1) {
            const newValue = [...innerValue];
            newValue[index] = inputVal;
            updateValue(newValue, index + 1);
        }
    };

    const handleBackspace = (index: number) => {
        const newValue = [...innerValue];
        if (innerValue[index]) {
            newValue[index] = '';
            updateValue(newValue);
        } else if (index > 0) {
            newValue[index - 1] = '';
            updateValue(newValue, index - 1);
        }
    };

    return (
        <div
            data-bspk="otp-input"
            data-disabled={disabled}
            data-invalid={invalid ? '' : undefined}
            data-readonly={readOnly ? '' : undefined}
            data-size={size}
        >
            <div data-inputs-wrapper>
                {Array.from({ length: 6 }).map((_, index) => (
                    <span data-input-wrapper="" key={index} role="presentation">
                        <input
                            aria-label={`Digit ${index + 1}`}
                            data-index={index}
                            data-input=""
                            disabled={disabled}
                            inputMode="numeric"
                            name={`Digit ${index + 1}`}
                            onChange={(e) => {
                                handleInputChange(e, index);
                            }}
                            onKeyDown={(e) => {
                                const isMac = navigator.userAgent.includes('Mac');
                                const isDeleteAllCombo =
                                    (isMac && e.metaKey && e.key === 'Backspace') ||
                                    (!isMac && e.ctrlKey && e.key === 'Backspace');

                                if (isDeleteAllCombo) {
                                    const cleared = Array(6).fill('');
                                    setInnerValue(cleared);
                                    onChange?.('');
                                    inputRefs.current[0]?.focus();
                                    e.preventDefault();
                                    return;
                                }

                                if (e.key === 'Backspace') {
                                    if (innerValue[index]) {
                                        const newValue = [...innerValue];
                                        newValue[index] = '';
                                        setInnerValue(newValue);
                                        onChange?.(newValue.join(''));
                                    } else if (index > 0) {
                                        handleBackspace(index);
                                    }
                                }
                            }}
                            pattern="\d*"
                            readOnly={readOnly}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type={readOnly ? 'password' : 'text'}
                            value={innerValue[index]}
                        />

                        {readOnly && <span aria-hidden="true" data-readonly-mask="" />}
                    </span>
                ))}
            </div>
        </div>
    );
}

OTPInput.bspkName = 'OTPInput';

export { OTPInput };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
