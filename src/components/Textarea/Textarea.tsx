import './textarea.scss';
import { ChangeEvent, useRef } from 'react';
import { FieldContextProps, useFieldInit } from '-/components/Field';
import { SetRef } from '-/types/common';
import { cssWithVars } from '-/utils/cwv';

export type TextareaProps = Partial<FieldContextProps> & {
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
     * @default 10
     * @minimum 3
     * @maximum 10
     */
    maxRows?: number;
    /**
     * Whether the character count should be displayed.
     *
     * @default true
     */
    characterCount?: boolean;
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
 *     import { Field, FieldLabel } from '@bspk/ui/Field';
 *
 *     export function Example() {
 *         const [value, setValue] = useState<string>('');
 *
 *         return (
 *             <Field>
 *                 <FieldLabel>Comment</FieldLabel>
 *                 <Textarea aria-label="Example aria-label" name="comment" onChange={setValue} value={value} />
 *             </Field>
 *         );
 *     }
 *
 * @name Textarea
 * @phase Utility
 */
export function Textarea({
    onChange,
    textSize = 'medium',
    value = '',
    name,
    innerRef,
    placeholder,
    id: idProp,
    minRows = 4,
    maxRows = 10,
    invalid: invalidProp,
    readOnly,
    disabled,
    required,
    characterCount,
    maxLength,
    ...otherProps
}: TextareaProps) {
    const { id, ariaDescribedBy, ariaErrorMessage, invalid } = useFieldInit({
        id: idProp,
        readOnly,
        disabled,
        invalid: invalidProp,
        required,
        labelTrailing: characterCount
            ? `${value?.length || 0}${maxLength && maxLength > 0 ? `/${maxLength}` : ''}`
            : undefined,
    });

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
                data-invalid={invalid || undefined}
                disabled={disabled}
                id={id}
                maxLength={maxLength}
                name={name}
                onBlur={(event) => {
                    const target = event.target as HTMLTextAreaElement;
                    target.scrollTop = 0;
                }}
                onChange={(event) => onChange(event.target.value, event)}
                onInput={onInput}
                placeholder={placeholder}
                readOnly={readOnly}
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

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
