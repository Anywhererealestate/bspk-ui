import { useCallback, useState } from 'react';
import { IncrementButton } from './IncrementButton';
import { useId } from '-/hooks/useId';
import { CommonProps, InvalidPropsLibrary } from '-/types/common';

import './number-input.scss';

const MAX = 99;
const MIN = 0;

const DEFAULT = {
    align: 'center',
    size: 'medium',
    disabled: false,
    readOnly: false,
} as const;

function isNumber(value: unknown, fallbackValue: number | undefined = undefined): number | undefined {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return fallbackValue;
    const num = Number(value);
    return isNaN(num) ? fallbackValue : num;
}

export type NumberInputProps = CommonProps<'aria-label' | 'disabled' | 'id' | 'name' | 'readOnly' | 'size'> &
    InvalidPropsLibrary & {
        /** The value of the control. */
        value?: number | string;
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
         *
         * @default 99
         * @maximum 99
         * @minimum 1
         */
        max?: number;
        /**
         * Defines the [minimum](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min) value that is
         * accepted.
         *
         * @default 0
         * @minimum 0
         */
        min?: number;
    };

/**
 * A input element that allows users to either input a numerical value or singularly increase or decrease the values by
 * pressing the (+) or (-).
 *
 * The value of the input is a number. The value is clamped to the min and max values if they are provided.
 *
 * @example
 *     import { NumberInput } from '@bspk/ui/NumberInput';
 *
 *     export function Example() {
 *         const [state, setState] = React.useState<number>();
 *
 *         return (
 *             <NumberInput
 *                 aria-label="Example aria-label"
 *                 name="Example name"
 *                 onChange={(nextValue) => setState(nextValue)}
 *                 value={state}
 *             />
 *         );
 *     }
 *
 * @name NumberInput
 * @phase EngineeringReview
 */
function NumberInput({
    value,
    onChange,
    align = DEFAULT.align,
    size = DEFAULT.size,
    disabled = DEFAULT.disabled,
    readOnly = DEFAULT.readOnly,
    name,
    id: inputIdProp,
    invalid,
    'aria-label': ariaLabel,
    max: maxProp,
    min: minProp,
}: NumberInputProps) {
    const centered = align !== 'left';
    const inputId = useId(inputIdProp);
    const max = Math.min(MAX, isNumber(maxProp) || MAX);
    const min = Math.max(MIN, isNumber(minProp) || MIN);
    const valueNumber = isNumber(value) || 0;

    const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);

    const handleIncrement = (increment: -1 | 1) => {
        if (!inputElement) return;
        const nextValue = (isNumber(inputElement.value) || 0) + increment;
        handleUpdate(nextValue);
    };

    const handleUpdate = useCallback(
        (nextValue: number | undefined) => {
            if (!inputElement) return;
            let nextVal = isNumber(nextValue);
            if (nextVal !== undefined) nextVal = Math.min(Math.max(nextVal, min), max);
            onChange(nextVal);
            inputElement.value = nextVal?.toString() || '';
        },
        [inputElement, min, max, onChange],
    );

    return (
        <div
            data-bspk="number-input"
            data-centered={centered || undefined}
            data-disabled={disabled || undefined}
            data-invalid={invalid || undefined}
            data-readonly={readOnly || undefined}
            data-size={size}
            data-stepper-input
        >
            {!!centered && (
                <IncrementButton disabled={valueNumber + -1 < min} increment={-1} onIncrement={handleIncrement} />
            )}
            <input
                aria-label={ariaLabel}
                autoComplete="off"
                defaultValue={String(valueNumber)}
                disabled={disabled}
                id={inputId}
                max={max}
                min={min}
                name={name}
                onBlur={() => {
                    handleUpdate(isNumber(inputElement?.value));
                }}
                readOnly={readOnly}
                ref={(node) => node && setInputElement(node)}
                type="number"
            />
            {!centered && (
                <>
                    <div aria-hidden data-divider />
                    <IncrementButton disabled={valueNumber + -1 < min} increment={-1} onIncrement={handleIncrement} />
                </>
            )}
            <IncrementButton disabled={valueNumber + 1 > max} increment={1} onIncrement={handleIncrement} />
        </div>
    );
}

NumberInput.bspkName = 'NumberInput';

export { NumberInput };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
