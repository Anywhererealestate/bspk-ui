import './textarea.scss';
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
            data-bspk="textarea"
            data-size={size}
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

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
