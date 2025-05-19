import { SvgAdd } from '@bspk/icons/Add';
import { SvgRemove } from '@bspk/icons/Remove';

import './number-input.scss';
import { useId } from './hooks/useId';
import { useLongPress } from './hooks/useLongPress';

import { CommonProps } from '.';

function isNumber(value: unknown): number | undefined {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
}

export type NumberInputProps = CommonProps<
    'aria-label' | 'disabled' | 'id' | 'invalid' | 'name' | 'readOnly' | 'size'
> & {
    /**
     * The value of the control.
     *
     * @required
     */
    value?: number;
    /** Callback when the value changes. */
    onChange: (value: number) => void;
    /**
     * If the value should be centered between the up & down buttons.
     *
     * @default false
     */
    centered?: boolean;
    /** Defines the [maximum](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/max) value that is accepted. */
    max?: number;
    /** Defines the [minimum](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min) value that is accepted. */
    min?: number;
};

/**
 * A input element that allows users to either input a numerical value or singularly increase or decrease the values by
 * pressing the (+) or (-).
 *
 * @name NumberInput
 */
function NumberInput({
    //
    value = 1,
    onChange,
    centered = false,
    size = 'medium',
    disabled = false,
    readOnly = false,
    name,
    id: inputIdProp,
    invalid,
    'aria-label': ariaLabel,
    max: maxProp,
    min: minProp,
}: NumberInputProps) {
    const inputId = useId(inputIdProp);
    const max = isNumber(maxProp);
    const min = isNumber(minProp);

    const fix = (next: number = value) => {
        let fixValue = next;
        if (typeof min !== 'undefined' && next < min) fixValue = min;
        if (typeof max !== 'undefined' && next > max) fixValue = max;
        if (fixValue !== value) onChange(fixValue);
    };

    const buttonProps = {
        min,
        max,
        disabled,
        readOnly,
        onChange: fix,
        value,
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
            {!!centered && <IncrementButton {...buttonProps} increment={-1} />}
            <input
                aria-label={ariaLabel}
                disabled={disabled}
                id={inputId}
                name={name}
                onBlur={() => {
                    fix();
                }}
                onChange={(event) => {
                    onChange(event.target.value as unknown as number);
                }}
                readOnly={readOnly}
                type="number"
                value={value}
            />
            {!centered && (
                <>
                    <div aria-hidden data-divider />
                    <IncrementButton {...buttonProps} increment={-1} />
                </>
            )}
            <IncrementButton {...buttonProps} increment={1} />
        </div>
    );
}

// eslint-disable-next-line react/no-multi-comp
function IncrementButton({
    increment,
    min,
    max,
    readOnly,
    disabled,
    onChange,
    value,
}: Pick<NumberInputProps, 'disabled' | 'max' | 'min' | 'onChange' | 'readOnly' | 'value'> & { increment: -1 | 1 }) {
    const add = increment === 1;
    const prevValue = isNumber(value) || 0;

    const isDisabled =
        readOnly ||
        disabled ||
        (typeof min !== 'undefined' && prevValue + increment < min) ||
        (typeof max !== 'undefined' && prevValue + increment > max);

    const longPress = useLongPress((pressCounter) => onChange(prevValue + increment * pressCounter), 2000, isDisabled);

    return (
        <button
            aria-label={`${add ? 'Increase' : 'Decrease'} value`}
            data-increment={increment}
            disabled={isDisabled}
            type="button"
            {...longPress.buttonProps}
        >
            {add ? <SvgAdd /> : <SvgRemove />}
        </button>
    );
}

NumberInput.bspkName = 'NumberInput';

export { NumberInput };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
