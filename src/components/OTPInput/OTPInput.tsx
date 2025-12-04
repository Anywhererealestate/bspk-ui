import './otp-input.scss';
import { useId } from '-/hooks/useId';
import { CommonProps } from '-/types/common';

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
    length = 6,
    size = 'medium',
    invalid = false,
    alphanumeric = false,
    'aria-label': ariaLabel = 'OTP input',
}: OTPInputProps) {
    const id = useId(idProp);
    const value = valueProp || '';
    const activeIndex = Math.min(value.length, length - 1);

    return (
        <div data-bspk="otp-input" data-invalid={invalid || undefined} data-size={size || 'medium'} id={id}>
            <input
                aria-label={ariaLabel}
                inputMode={alphanumeric ? 'text' : 'numeric'}
                name={name}
                onChange={(event) => {
                    onChange(event.target.value.trim().toUpperCase().slice(0, length));
                }}
                type={alphanumeric ? 'text' : 'number'}
                value={value}
            />
            <span data-digits>
                {Array.from({ length }, (_, index) => (
                    <span data-active={index === activeIndex || undefined} data-digit key={index}>
                        {value[index]}
                    </span>
                ))}
            </span>
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
