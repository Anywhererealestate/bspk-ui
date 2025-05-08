import { SvgAdd } from '@bspk/icons/Add';
import { SvgRemove } from '@bspk/icons/Remove';
import { css } from '@emotion/react';

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
            css={style}
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

export const style = css`
    // medium
    --font: var(--body-base);
    --height: var(--spacing-sizing-10);
    --svg-width: var(--spacing-sizing-05);
    --color: var(--foreground-neutral-on-surface);
    width: 100%;

    display: flex;
    flex-flow: row nowrap;
    font: var(--font);
    height: var(--height);
    border: 1px solid var(--stroke-neutral-base);
    border-radius: var(--radius-small);
    background: var(--surface-neutral-t1-base);

    &:focus-within {
        border-color: var(--stroke-brand-primary);
        outline: 1px solid var(--stroke-brand-primary);
    }

    [data-divider] {
        width: 4px;
        border-right: 1px solid var(--stroke-neutral-base);
        // account for border - 3(margin)  * 2 + 2(border)
        height: calc(var(--height) - 8px);
        margin: 3px 0;
    }

    button {
        min-width: var(--height);
        background: none;
        border: none;
        cursor: pointer;
        font: var(--font);
        svg {
            width: var(--svg-width);
        }
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--color);

        &:disabled {
            cursor: not-allowed;
            color: var(--foreground-neutral-disabled-on-surface);
        }
    }

    input {
        color: var(--color);
        min-width: 0;
        display: block;
        font: var(--font);
        text-align: center;
        padding: 0 var(--spacing-sizing-03);
        background: transparent;
        border: none;

        &:focus {
            outline: none;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &[type='number'] {
            appearance: textfield;
            -moz-appearance: textfield;
        }
    }

    &:not([data-disabled], [data-readonly]) {
        input,
        button:not(:disabled) {
            &:hover {
                background-color: var(--interactions-hover-opacity);
            }

            &:active {
                background-color: var(--interactions-press-opacity);
            }
        }

        &[data-invalid] {
            border-color: var(--status-error);
            outline-color: var(--status-error);
        }
    }

    &[data-disabled],
    &[data-readonly] {
        --color: var(--foreground-neutral-disabled-on-surface);
        border-color: var(--stroke-neutral-disabled-light);
        background:
            linear-gradient(var(--interactions-disabled-opacity), var(--interactions-disabled-opacity)),
            linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));

        [data-divider] {
            border-color: var(--stroke-neutral-disabled-light);
        }
    }

    &[data-readonly] {
        input {
            color: var(--foreground-neutral-on-surface) !important;
        }
    }

    &[data-size='small'] {
        --font: var(--body-small);
        --height: var(--spacing-sizing-08);
    }

    &[data-size='large'] {
        --font: var(--body-large);
        --height: var(--spacing-sizing-12);
        --svg-width: var(--spacing-sizing-06);
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
