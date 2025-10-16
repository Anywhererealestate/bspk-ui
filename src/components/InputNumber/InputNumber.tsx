import './input-number.scss';
import { useMemo } from 'react';
import { IncrementButton } from './IncrementButton';
import { FieldContextProps, useFieldInit } from '-/components/Field';
import { useId } from '-/hooks/useId';
import { CommonProps } from '-/types/common';

function isNumber(value: unknown, fallbackValue: number | undefined = undefined): number | undefined {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return fallbackValue;
    const num = Number(value);
    return isNaN(num) ? fallbackValue : num;
}

export type InputNumberProps = CommonProps<'aria-label' | 'name' | 'size'> &
    Partial<FieldContextProps> & {
        /** The value of the control. */
        value?: number;
        /**
         * Callback when the value changes.
         *
         * @required
         */
        onChange: (value: number | string | undefined) => void;
        /**
         * The alignment of the input box. Centered between the plus and minus buttons or to the left of the buttons.
         *
         * @default center
         */
        align?: 'center' | 'left';
        /**
         * Defines the [maximum](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/max) value that is
         * accepted.
         */
        max?: number;
        /**
         * Defines the [minimum](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min) value that is
         * accepted.
         *
         * @default 0
         */
        min?: number;
        /**
         * The amount to increment or decrement the value by when the (+) or (-) buttons are pressed.
         *
         * @default 1
         */
        step?: number;
    };

/**
 * A input element that allows users to either input a numerical value or singularly increase or decrease the values by
 * pressing the (+) or (-).
 *
 * The value of the input is a number. The value is clamped to the min and max values if they are provided.
 *
 * @example
 *     import { InputNumber } from '@bspk/ui/InputNumber';
 *
 *     export function Example() {
 *         const [state, setState] = React.useState<number>();
 *
 *         return (
 *             <Field>
 *                 <FieldLabel>Example Input Number</FieldLabel>
 *                 <InputNumber
 *                     aria-label="Example aria-label"
 *                     name="Example name"
 *                     onChange={(nextValue) => setState(nextValue)}
 *                     value={state}
 *                 />
 *                 <FieldDescription>The input number allows you to increment or decrement a value.</FieldDescription>
 *             </Field>
 *         );
 *     }
 *
 * @name InputNumber
 * @phase Utility
 */
export function InputNumber({
    value: valueProp,
    onChange,
    align = 'center',
    size = 'medium',
    disabled = false,
    readOnly = false,
    name,
    id: idProp,
    'aria-label': ariaLabel,
    max: maxProp,
    min = 0,
    invalid: invalidProp = false,
    step = 1,
    required: requiredProp = false,
    ...inputElementProps
}: InputNumberProps) {
    const { id, ariaDescribedBy, ariaErrorMessage, invalid, required } = useFieldInit({
        id: idProp,
        readOnly,
        disabled,
        invalid: invalidProp,
        required: requiredProp,
    });

    const max = typeof maxProp === 'number' && maxProp >= min ? maxProp : Number.MAX_SAFE_INTEGER;
    const centered = align !== 'left';
    const inputId = useId(id);
    const value = useMemo(() => isNumber(valueProp) || 0, [valueProp]);

    const handleIncrement = (increment: -1 | 1) => {
        onChange(value + increment * step);
    };

    return (
        <div
            data-bspk="input-number"
            data-centered={centered || undefined}
            data-disabled={disabled || undefined}
            data-invalid={invalid || undefined}
            data-readonly={readOnly || undefined}
            data-size={size}
            data-stepper-input
        >
            {!!centered && (
                <IncrementButton
                    disabled={disabled ? true : value + -1 < min}
                    increment={-1}
                    inputId={inputId}
                    onIncrement={handleIncrement}
                />
            )}
            <input
                {...inputElementProps}
                aria-describedby={ariaDescribedBy || undefined}
                aria-errormessage={ariaErrorMessage || undefined}
                aria-invalid={invalid}
                aria-label={ariaLabel}
                autoComplete="off"
                data-input
                data-stepper-input-element
                disabled={disabled}
                id={inputId}
                inputMode="numeric"
                max={max}
                min={min}
                name={name}
                onChange={(e) => {
                    onChange(isNumber(e.target.value));
                }}
                readOnly={readOnly}
                required={required}
                step={step}
                type="number"
                value={value}
            />
            {!centered && (
                <>
                    <div aria-hidden data-divider />
                    <IncrementButton
                        disabled={!!disabled || value + -1 < min}
                        increment={-1}
                        inputId={inputId}
                        onIncrement={handleIncrement}
                    />
                </>
            )}
            <IncrementButton
                disabled={!!disabled || value + 1 > max}
                increment={1}
                inputId={inputId}
                onIncrement={handleIncrement}
            />
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
