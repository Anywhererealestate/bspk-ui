import './number-input.scss';
import { SvgAdd } from '@bspk/icons/Add';
import { SvgRemove } from '@bspk/icons/Remove';
import { useState } from 'react';

import { useId } from './hooks/useId';
import { useLongPress } from './hooks/useLongPress';

import { CommonProps, InvalidPropsLibrary } from '.';

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

    const onIncrement = (increment: -1 | 1) => {
        let nextValue = (isNumber(inputElement!.value) || 0) + increment;
        if (nextValue > max) nextValue = max;
        if (nextValue < min) nextValue = min;
        inputElement!.value = String(nextValue);
        onChange(nextValue);
    };

    return (
        <div
            aria-valuemax={max || undefined}
            aria-valuemin={min || undefined}
            data-bspk="number-input"
            data-centered={centered || undefined}
            data-disabled={disabled || undefined}
            data-invalid={invalid || undefined}
            data-readonly={readOnly || undefined}
            data-size={size}
            data-stepper-input
        >
            {!!centered && (
                <IncrementButton disabled={valueNumber + -1 < min} increment={-1} onIncrement={onIncrement} />
            )}
            <input
                aria-label={ariaLabel}
                defaultValue={String(valueNumber)}
                disabled={disabled}
                id={inputId}
                max={max}
                min={min}
                name={name}
                onBlur={() => {
                    if (!inputElement) return;

                    let nextValue = isNumber(inputElement.value);

                    if (typeof nextValue === 'undefined') {
                        onChange(undefined);
                        inputElement.value = '';
                        return;
                    }

                    nextValue = Math.max(min, nextValue);
                    nextValue = Math.min(max || 99, nextValue);
                    onChange(nextValue);
                    inputElement.value = nextValue.toString();
                }}
                readOnly={readOnly}
                ref={(node) => node && setInputElement(node)}
                type="number"
            />
            {!centered && (
                <>
                    <div aria-hidden data-divider />
                    <IncrementButton disabled={valueNumber + -1 < min} increment={-1} onIncrement={onIncrement} />
                </>
            )}
            <IncrementButton disabled={valueNumber + 1 > max} increment={1} onIncrement={onIncrement} />
        </div>
    );
}

type IncrementButtonProps = {
    disabled: boolean;
    increment: -1 | 1;
    onIncrement: (increment: -1 | 1) => void;
};

// eslint-disable-next-line react/no-multi-comp
function IncrementButton({ increment, disabled, onIncrement }: IncrementButtonProps) {
    const add = increment === 1;

    const { setTriggerElement, ...handlers } = useLongPress(() => onIncrement(increment), disabled);

    return (
        <button
            aria-label={`${add ? 'Increase' : 'Decrease'} value`}
            data-increment={increment}
            disabled={disabled}
            ref={setTriggerElement}
            type="button"
            {...handlers}
        >
            {add ? <SvgAdd /> : <SvgRemove />}
        </button>
    );
}

NumberInput.bspkName = 'NumberInput';

export { NumberInput };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
