import './input-number.scss';
import { SvgAdd } from '@bspk/icons/Add';
import { SvgRemove } from '@bspk/icons/Remove';
import { useEffect, useRef } from 'react';
import { useId } from '-/hooks/useId';
import { useLongPress } from '-/hooks/useLongPress';
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
 *     import { InputNumber } from '-/components/InputNumber';
 *
 *     () => {
 *         const [value, setValue] = useState<number | undefined>();
 *
 *         return (
 *             <div style={{ width: 320 }}>
 *                 <Field
 *                     controlId="example-input-number"
 *                     helperText="The input number allows you to increment or decrement a value."
 *                     label="Example Input Number"
 *                 >
 *                     <InputNumber
 *                         aria-label="Example aria-label"
 *                         id="example-input-number"
 *                         name="example-name"
 *                         onChange={(nextValue) => setValue(nextValue)}
 *                         value={value}
 *                     />
 *                 </Field>
 *             </div>
 *         );
 *     };
 *
 * @name InputNumber
 * @phase Stable
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
    invalid = false,
    step = 1,
    required = false,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    ...inputElementProps
}: InputNumberProps) {
    const inputId = useId(idProp);
    const max = typeof maxProp === 'number' && maxProp >= min ? maxProp : Number.MAX_SAFE_INTEGER;
    const centered = align !== 'left';
    const value = isNumber(valueProp, min);
    const removeDisabled = disabled || value + step * -1 < min;
    const addDisabled = disabled || value + step > max;

    const valueRef = useRef(value);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    const decrementHandler = () => {
        const next = valueRef.current + step * -1;
        if (next < min) return false;
        onChange(next);
        return true;
    };

    const incrementHandler = () => {
        const next = valueRef.current + step;
        if (next > max) return false;
        onChange(next);
        return true;
    };

    const addPressHandlers = useLongPress({ callback: incrementHandler });
    const removePressHandlers = useLongPress({ callback: decrementHandler });

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
            <button
                {...removePressHandlers}
                aria-controls={inputId}
                aria-label="Decrease value"
                disabled={removeDisabled}
                tabIndex={-1}
                type="button"
            >
                <SvgRemove aria-hidden />
            </button>
            <button
                {...addPressHandlers}
                aria-controls={inputId}
                aria-label="Increase value"
                disabled={addDisabled}
                tabIndex={-1}
                type="button"
            >
                <SvgAdd aria-hidden />
            </button>
        </div>
    );
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
