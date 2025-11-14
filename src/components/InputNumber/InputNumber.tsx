import './input-number.scss';
import { useEffect, useRef } from 'react';
import { IncrementButton } from './IncrementButton';
import { useFieldInit } from '-/components/Field';
import { useId } from '-/hooks/useId';
import { CommonProps, FieldControlProps } from '-/types/common';

function isNumber(value: unknown): number | undefined;
function isNumber(value: unknown, fallbackValue: number): number;
function isNumber(value: unknown, fallbackValue?: number): number | undefined {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return fallbackValue;
    const num = parseFloat(value);
    return isNaN(num) ? fallbackValue : num;
}

export type InputNumberProps = CommonProps<'size'> &
    FieldControlProps<number> & {
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
 * For a more complete example with field usage, see the InputNumberField component.
 *
 * @example
 *     import { InputNumber } from '@bspk/ui/InputNumber';
 *
 *     () => {
 *         const [state, setState] = useState<number | undefined>();
 *
 *         return (
 *             <>
 *                 // standalone input number example
 *                 <InputNumber
 *                     aria-label="Example aria-label"
 *                     name="example-name"
 *                     onChange={(nextValue) => setState(nextValue)}
 *                     value={state}
 *                 />
 *                 <br />
 *                 // input number used within a field
 *                 <Field>
 *                     <FieldLabel>Example Input Number</FieldLabel>
 *                     <InputNumber
 *                         aria-label="Example aria-label"
 *                         name="example-name"
 *                         onChange={(nextValue) => setState(nextValue)}
 *                         value={state}
 *                     />
 *                     <FieldDescription>
 *                         The input number allows you to increment or decrement a value.
 *                     </FieldDescription>
 *                 </Field>
 *             </>
 *         );
 *     };
 *
 * @name InputNumber
 * @phase UXReview
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
    'aria-label': ariaLabel = 'Input number',
    max: maxProp,
    min = 0,
    invalid: invalidProp = false,
    step = 1,
    required = false,
    ...inputElementProps
}: InputNumberProps) {
    const { id, ariaDescribedBy, ariaErrorMessage, invalid } = useFieldInit({
        idProp,
        required,
        disabled,
        readOnly,
        invalidProp,
    });
    const max = typeof maxProp === 'number' && maxProp >= min ? maxProp : Number.MAX_SAFE_INTEGER;
    const centered = align !== 'left';
    const inputId = useId(id);
    const value = isNumber(valueProp, min);
    const removeDisabled = disabled || value + step * -1 < min;
    const addDisabled = disabled || value + step > max;

    const valueRef = useRef(value);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    const incrementHandler = (kind: 'add' | 'remove') => {
        const increment = kind === 'add' ? step : step * -1;
        const next = valueRef.current + increment;
        if (next < min || next > max) return false;
        onChange(next);
        return true;
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
                onBlur={(e) => {
                    const next = isNumber(e.target.value, min);
                    e.target.value = next?.toString() || '';
                    onChange(next);
                }}
                onChange={(e) => {
                    const next = isNumber(e.target.value, min);
                    onChange(next);
                }}
                readOnly={readOnly}
                required={required}
                step={step}
                type="number"
                value={value !== undefined ? value : ''}
            />
            <div aria-hidden data-divider />
            <IncrementButton
                disabled={removeDisabled}
                inputId={inputId}
                kind="remove"
                triggerIncrement={incrementHandler}
            />
            <IncrementButton disabled={addDisabled} inputId={inputId} kind="add" triggerIncrement={incrementHandler} />
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
