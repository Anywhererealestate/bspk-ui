import { css } from '@emotion/react';
import { ChangeEvent, CSSProperties, Ref } from 'react';

import { useId } from './hooks/useId';

import { CommonProps } from './';

export type TextareaProps = CommonProps<'aria-label' | 'disabled' | 'id' | 'invalid' | 'readOnly' | 'required'> & {
    /**
     * Callback when the value of the field changes.
     *
     * @type (next: String, Event) => void
     * @required
     */
    onChange: (next: string, event?: ChangeEvent<HTMLTextAreaElement>) => void;
    /**
     * The size of the field.
     *
     * @default medium
     */
    size?: 'large' | 'medium' | 'small';
    /** The value of the field. */
    value?: string;
    /**
     * The textarea control name of the field.
     *
     * @required
     */
    name: string;
    /** The ref of the field. */
    innerRef?: Ref<HTMLTextAreaElement>;
    /** The placeholder of the field. */
    placeholder?: string;
    /**
     * The maximum number of characters that the field will accept.
     *
     * @minimum 1
     */
    maxLength?: number;
    /**
     * The minimum number of rows that the textarea should have. If set the textarea will automatically grow and shrink
     * to fit the content.
     *
     * @minimum 3
     */
    minRows?: number;
    /**
     * The maximum number of rows that the textarea should have. If set the textarea will automatically grow and shrink
     * to fit the content.
     *
     * @maximum 10
     */
    maxRows?: number;
};

const MIN_ROWS = 3;
const MAX_ROWS = 10;

/**
 * A component that allows users to input large amounts of text that could span multiple lines.
 *
 * @element
 *
 * @name Textarea
 */
function Textarea({
    invalid: invalidProp,
    onChange,
    size = 'medium',
    value = '',
    name,
    'aria-label': ariaLabel,
    innerRef,
    placeholder,
    id: idProp,
    minRows: minRowsProp = MIN_ROWS,
    maxRows: maxRowsProp = MAX_ROWS,
    ...otherProps
}: TextareaProps) {
    const id = useId(idProp);
    const invalid = !otherProps.readOnly && !otherProps.disabled && invalidProp;
    // ensure minRows and maxRows are within bounds
    const minRows = Math.min(MAX_ROWS, Math.max(minRowsProp, MIN_ROWS));
    const maxRows = Math.max(MIN_ROWS, Math.min(maxRowsProp, MAX_ROWS));

    return (
        <div
            css={style}
            data-size={size}
            data-textarea
            style={
                {
                    '--min-rows': minRows,
                    '--max-rows': maxRows,
                } as CSSProperties
            }
        >
            <textarea
                {...otherProps}
                aria-invalid={invalid || undefined}
                aria-label={ariaLabel}
                id={id}
                name={name}
                onBlur={(event) => {
                    const target = event.target as HTMLTextAreaElement;
                    target.scrollTop = 0;
                }}
                onChange={(event) => onChange(event.target.value, event)}
                onInput={(event) => {
                    const target = event.target as HTMLTextAreaElement;
                    // we know the textarea was resized, so we don't want to auto-size it
                    if (target.style.height) return;
                    (target.nextSibling as HTMLElement).innerText = `${target.value}\n`;
                }}
                placeholder={placeholder}
                ref={innerRef}
                value={value}
            />
            <div aria-hidden data-replicated-value />
        </div>
    );
}

Textarea.bspkName = 'Textarea';

export { Textarea };

export const style = css`
    display: grid;
    width: 100%;

    // &[data-size='medium']
    --font: var(--body-base);
    --line-height: 20px;
    --padding: var(--spacing-sizing-03);

    &[data-size='small'] {
        --font: var(--body-small);
        --line-height: 20px;
        --padding: var(--spacing-sizing-02);
    }

    &[data-size='large'] {
        --font: var(--body-large);
        --line-height: 24px;
        --padding: var(--spacing-sizing-03);
    }

    [data-replicated-value] {
        white-space: pre-wrap;
        visibility: hidden;
    }

    textarea,
    [data-replicated-value] {
        width: 100%;
        font: var(--font);
        border: 1px solid var(--border-color);
        padding: var(--padding);
        grid-area: 1 / 1 / 2 / 2;
        min-height: calc((var(--line-height) * var(--min-rows)) + (var(--padding) * 2));
        max-height: calc((var(--line-height) * var(--max-rows)) + (var(--padding) * 2));
    }

    textarea {
        --border-color: var(--stroke-neutral-base);

        resize: vertical;
        color: var(--foreground-neutral-on-surface);
        background-color: var(--surface-neutral-t1-base);
        border-radius: var(--radius-small);

        &:focus-within {
            --border-color: var(--stroke-neutral-focus);
            outline: none;
            color: var(--foreground-neutral-on-surface);
        }

        &:disabled {
            pointer-events: none;
            background: 
    // multiple colors

                linear-gradient(var(--interactions-disabled-opacity), var(--interactions-disabled-opacity)),
                linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
            color: var(--foreground-neutral-disabled-on-surface);
        }

        &:read-only {
            background: 
    // multiple colors

                linear-gradient(var(--interactions-disabled-opacity), var(--interactions-disabled-opacity)),
                linear-gradient(var(--surface-neutral-t1-base), var(--surface-neutral-t1-base));
            color: var(--foreground-neutral-on-surface-variant-02);
            cursor: not-allowed;
        }

        &[aria-invalid] {
            --border-color: var(--status-error);
        }
    }
`;

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
