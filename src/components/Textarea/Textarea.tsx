import { ChangeEvent, useRef } from 'react';

import { useId } from '-/hooks/useId';
import { CommonProps, FormFieldControlProps, SetRef } from '-/types/common';
import { cssWithVars } from '-/utils/cwv';

import './textarea.scss';

const DEFAULT = {
    minRows: 3,
    maxRows: 10,
    textSize: 'medium',
} as const;

export type TextareaProps = CommonProps<'aria-label' | 'disabled' | 'id' | 'invalid' | 'readOnly'> &
    FormFieldControlProps & {
        /**
         * Callback when the value of the field changes.
         *
         * @type (next: String, Event) => void
         * @required
         */
        onChange: (next: string, event?: ChangeEvent<HTMLTextAreaElement>) => void;
        /**
         * The text size of the field.
         *
         * @default medium
         */
        textSize?: 'large' | 'medium' | 'small';
        /**
         * The value of the field.
         *
         * @type multiline
         */
        value?: string;
        /**
         * The textarea control name of the field.
         *
         * @required
         */
        name: string;
        /** The ref of the field. */
        innerRef?: SetRef<HTMLTextAreaElement>;
        /** The placeholder of the field. */
        placeholder?: string;
        /**
         * The maximum number of characters that the field will accept.
         *
         * @minimum 1
         */
        maxLength?: number;
        /**
         * The minimum number of rows that the textarea will show.
         *
         * @default 3
         * @minimum 3
         * @maximum 10
         */
        minRows?: number;
        /**
         * The maximum number of rows that the textarea will show.
         *
         * When set the textarea will automatically adjust its height to fit the content up to this limit.
         *
         * @default 3
         * @minimum 3
         * @maximum 10
         */
        maxRows?: number;
    };

/**
 * A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component gives you a textarea HTML element that automatically adjusts its height to match the length of the
 * content within maximum and minimum rows. A character counter when a maxLength is set to show the number of characters
 * remaining below the limit.
 *
 * @example
 *     import { useState } from 'react';
 *     import { Textarea } from '@bspk/ui/Textarea';
 *
 *     export function Example() {
 *         const [value, setValue] = useState<string>('');
 *
 *         return <Textarea aria-label="Example aria-label" name="Example name" onChange={setValue} value={value} />;
 *     }
 *
 * @element
 *
 * @name Textarea
 * @phase Utility
 */
function Textarea({
    invalid: invalidProp,
    onChange,
    textSize = DEFAULT.textSize,
    value = '',
    name,
    'aria-label': ariaLabel,
    innerRef,
    placeholder,
    id: idProp,
    minRows: minRowsProp = DEFAULT.minRows,
    maxRows: maxRowsProp = DEFAULT.maxRows,
    'aria-describedby': ariaDescribedBy,
    'aria-errormessage': ariaErrorMessage,
    ...otherProps
}: TextareaProps) {
    const id = useId(idProp);
    const invalid = !otherProps.readOnly && !otherProps.disabled && invalidProp;
    // ensure minRows and maxRows are within bounds
    const minRows = Math.min(DEFAULT.maxRows, Math.max(minRowsProp, DEFAULT.minRows));
    const maxRows = Math.max(DEFAULT.minRows, Math.min(maxRowsProp, DEFAULT.maxRows));

    const onInput = () => {
        const target = textareaElement.current;
        if (!target) return;
        // we know the textarea was resized, so we don't want to auto-size it
        if (target.style.height) return;
        (target.nextSibling as HTMLElement).innerText = `${target.value}\n`;
    };

    const textareaElement = useRef<HTMLTextAreaElement | null>(null);

    return (
        <div
            data-bspk="textarea"
            data-size={textSize}
            style={cssWithVars({
                '--min-rows': minRows,
                '--max-rows': maxRows,
            })}
        >
            <textarea
                {...otherProps}
                aria-describedby={ariaDescribedBy || undefined}
                aria-errormessage={ariaErrorMessage || undefined}
                aria-invalid={invalid || undefined}
                aria-label={ariaLabel}
                className="bspk-textarea"
                id={id}
                name={name}
                onBlur={(event) => {
                    const target = event.target as HTMLTextAreaElement;
                    target.scrollTop = 0;
                }}
                onChange={(event) => onChange(event.target.value, event)}
                onInput={onInput}
                placeholder={placeholder}
                ref={(node) => {
                    innerRef?.(node);
                    textareaElement.current = node;
                    onInput();
                }}
                value={value}
                wrap="hard"
            />
            <div aria-hidden data-replicated-value />
        </div>
    );
}

Textarea.bspkName = 'Textarea';

export { Textarea };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
