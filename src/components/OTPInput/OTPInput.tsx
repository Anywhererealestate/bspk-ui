import './otp-input.scss';
import { useRef } from 'react';
import { useId } from '-/hooks/useId';
import { CommonProps } from '-/types/common';

export type OTPInputProps = CommonProps<'id' | 'invalid' | 'name' | 'size'> & {
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
 *         <OTPInput name="2-auth" length={4} value={otpValue} onChange={setOtpValue} />;
 *     };
 *
 * @name OTPInput
 * @phase UXReview
 */
export function OTPInput({
    value: valueProp,
    onChange,
    name,
    id: idProp,
    length = 6,
    size = 'medium',
    invalid = false,
}: OTPInputProps) {
    const id = useId(idProp);
    const value = valueProp?.slice(0, length) || '';
    const parentRef = useRef<HTMLDivElement | null>(null);

    const element = (index: number) => parentRef.current?.children[index + 1] as HTMLElement;

    const setIndex = (index: number, character: string) => {
        const charArray = value.split('');
        charArray[index] = character;
        return charArray.join('');
    };

    const updateValue = (next: string) => onChange(next.slice(0, length).toUpperCase());

    return (
        <div
            data-bspk="otp-input"
            data-invalid={invalid || undefined}
            data-size={size || 'medium'}
            id={id}
            ref={parentRef}
        >
            <input name={name} type="hidden" value={value} />
            {Array.from({ length }, (_, index) => (
                <span
                    aria-label={`OTP digit ${index + 1}`}
                    data-digit={index + 1}
                    key={index}
                    onClick={(e) => {
                        if (value[index]) return;
                        // if a digit does not exist for the previous index then focus the previous input
                        if (!value[index - 1]) {
                            e.preventDefault();
                            element(value.length)?.focus();
                        }
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'Backspace') {
                            if (value) {
                                // delete the last value if there is one and focus the first empty input
                                const next = value.slice(0, -1);
                                updateValue(next);
                                element(next.length)?.focus();
                            }
                        }

                        // if a single character key is pressed at at the current index and focus the next input
                        if (event.key.length === 1) {
                            updateValue(setIndex(index, event.key));
                            element(index + 1)?.focus();
                        }
                    }}
                    onPaste={(event) => {
                        const pastedData = event.clipboardData.getData('text').trim();
                        updateValue(pastedData);
                        element(length - 1)?.focus();
                    }}
                    role="textbox"
                    tabIndex={0}
                >
                    {value?.[index] || ''}
                </span>
            ))}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
