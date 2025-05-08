import { SvgCancel } from '@bspk/icons/Cancel';
import { css } from '@emotion/react';
import { ChangeEvent, HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, ReactNode } from 'react';

import { useId } from './hooks/useId';

import { ElementProps, CommonProps } from '.';

export type TextInputProps = CommonProps<
    'aria-label' | 'disabled' | 'id' | 'invalid' | 'name' | 'readOnly' | 'required' | 'size' | 'value'
> & {
    /**
     * Callback when the value of the field changes.
     *
     * @type (next: String, Event) => void
     * @required
     */
    onChange: (next: string, event?: ChangeEvent<HTMLInputElement>) => void;
    /** The ref of the container. */
    containerRef?: (node: HTMLElement | null) => void;
    /** The ref of the input. */
    inputRef?: (node: HTMLElement | null) => void;
    /** The trailing element to display in the field. */
    trailing?: ReactNode;
    /** The leading element to display in the field. */
    leading?: ReactNode;
    /** The placeholder of the field. */
    placeholder?: string;
    /** The type of the input. */
    type?: Extract<HTMLInputTypeAttribute, 'number' | 'text'>;
    /**
     * Specifies if user agent has any permission to provide automated assistance in filling out form field values.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
     *
     * @default off
     */
    autoComplete?: HTMLInputAutoCompleteAttribute;
};

/**
 * A text input that allows users to enter text, numbers or symbols in a singular line. This is the base element and is
 * not intended to be used directly. Use the TextField component.
 *
 * @element
 *
 * @name TextInput
 */
function TextInput({
    invalid: invalidProp,
    onChange,
    size = 'medium',
    value = '',
    name,
    'aria-label': ariaLabel,
    inputRef,
    required,
    placeholder,
    id: idProp,
    leading,
    trailing,
    type,
    readOnly,
    disabled,
    autoComplete = 'off',
    containerRef,
    ...otherProps
}: ElementProps<TextInputProps, 'div'>) {
    const id = useId(idProp);

    const invalid = !readOnly && !disabled && invalidProp;

    return (
        <div
            css={style}
            data-disabled={disabled || undefined}
            data-invalid={invalid || undefined}
            data-readonly={readOnly || undefined}
            data-required={required || undefined}
            data-size={size}
            data-text-input
            ref={containerRef}
            {...otherProps}
        >
            {leading && <span data-leading>{leading}</span>}
            <input
                aria-invalid={invalid || undefined}
                aria-label={ariaLabel}
                autoComplete={autoComplete}
                disabled={disabled || undefined}
                id={id}
                name={name}
                onChange={(event) => {
                    onChange(event.target.value, event);
                }}
                placeholder={placeholder || ' '}
                readOnly={readOnly || undefined}
                ref={inputRef}
                required={required || undefined}
                type={type}
                value={value}
            />
            {trailing && <span data-trailing>{trailing}</span>}
            {value?.toString().length > 0 && !readOnly && !disabled && (
                <button aria-label="clear" data-clear onClick={() => onChange('')}>
                    <SvgCancel />
                </button>
            )}
        </div>
    );
}

TextInput.bspkName = 'TextInput';

export { TextInput };

export const style = css`
    --border-color: var(--stroke-neutral-base);
    display: flex;
    flex-direction: row;
    background-color: var(--surface-neutral-t1-base);
    border: solid 1px var(--border-color);
    height: var(--field-height);
    border-radius: var(--radius-small);
    padding: 0 var(--field-padding);
    gap: var(--spacing-sizing-01);
    flex-wrap: nowrap;
    width: 100%;

    &:focus-within {
        --border-color: var(--stroke-brand-primary);
    }

    & > * {
        display: flex;
        justify-content: center;
        align-items: center;
        height: var(--field-height);
        font: var(--field-font);
        color: var(--foreground-neutral-on-surface);
        min-width: 0;
    }

    &:hover:not(:focus-within) {
        background: 
    // multiple colors

            linear-gradient(var(--interactions-hover-opacity), var(--interactions-hover-opacity)),
            linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
    }

    &:active:not(:focus-within) {
        background: 
    // multiple colors

            linear-gradient(var(--interactions-press-opacity), var(--interactions-press-opacity)),
            linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
    }

    &[data-readonly] {
        --border-color: var(--stroke-neutral-disabled-light);

        background: 
    // multiple colors

            linear-gradient(var(--interactions-disabled-opacity), var(--interactions-disabled-opacity)),
            linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
    }

    &[data-disabled] {
        --border-color: var(--stroke-neutral-disabled-light);

        background:
    // multiple colors

            linear-gradient(var(--interactions-disabled-opacity), var(--interactions-disabled-opacity)),
            linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));

        & > * {
            color: var(--foreground-neutral-disabled-on-surface);
        }
    }

    &[data-invalid] {
        --border-color: var(--status-error);
    }

    &[data-size='small'] {
        --field-padding: var(--spacing-sizing-02);
        --field-height: var(--spacing-sizing-08);
        --field-font: var(--body-small);
        --field-icon-width: var(--spacing-sizing-04);
        --field-clear-width: var(--spacing-sizing-05);
    }

    &[data-size='medium'] {
        --field-padding: var(--spacing-sizing-03);
        --field-height: var(--spacing-sizing-10);
        --field-font: var(--body-base);
        --field-icon-width: var(--spacing-sizing-05);
        --field-clear-width: var(--spacing-sizing-05);
    }

    &[data-size='large'] {
        --field-padding: var(--spacing-sizing-03);
        --field-height: var(--spacing-sizing-12);
        --field-font: var(--body-large);
        --field-icon-width: var(--spacing-sizing-06);
        --field-clear-width: var(--spacing-sizing-06);
    }

    [data-leading],
    [data-trailing] {
        svg {
            width: var(--field-icon-width);
        }
    }

    label {
        font: var(--labels-small);
        color: var(--foreground-neutral-on-surface-variant-01);
    }

    input {
        flex: 1;
        background-color: transparent !important;
        border: none;
        outline: none;
        padding: 0;
        pointer-events: all;
        text-overflow: ellipsis;

        &[type='number']::-webkit-inner-spin-button,
        &[type='number']::-webkit-outer-spin-button {
            display: none;
        }
    }

    button[data-clear] {
        display: none;
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
        pointer-events: all;
        margin-left: var(--spacing-sizing-02);
        padding-right: var(--field-padding);

        svg {
            pointer-events: none;
            width: var(--field-clear-width);
        }
    }

    &:focus-within {
        button[data-clear] {
            display: flex;
        }
    }

    &:has(button[data-clear]) {
        padding-right: 0;
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
