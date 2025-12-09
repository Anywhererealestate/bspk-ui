import './textarea.scss';
import { ChangeEvent, useRef } from 'react';
import { useFieldInit } from '-/components/Field';
import { CommonProps, FieldControlProps, SetRef } from '-/types/common';
import { cssWithVars } from '-/utils/cwv';

export type TextareaProps = CommonProps<'size'> &
    FieldControlProps<string, ChangeEvent<HTMLTextAreaElement>> & {
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
    };

/**
 * A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component gives you a textarea HTML element that automatically adjusts its height to match the length of the
 * content within maximum and minimum rows. A character counter when a maxLength is set to show the number of characters
 * remaining below the limit.
 *
 * For a more complete example with field usage, see the TextareaField component.
 *
 * @example
 *     import { useState } from 'react';
 *     import { Textarea } from '@bspk/ui/Textarea';
 *
 *     () => {
 *         const [value, setValue] = useState<string | undefined>('');
 *
 *         return (
 *             <div style={{ width: 320 }}>
 *                 <Field>
 *                     <FieldLabel>Example Textarea</FieldLabel>
 *                     <Textarea name="example-name" onChange={setValue} value={value} />
 *                     <FieldDescription>This is an example textarea field.</FieldDescription>
 *                 </Field>
 *             </div>
 *         );
 *     };
 *
 * @element
 *
 * @name Textarea
 * @phase Stable
 */
export function Textarea({
    invalid: invalidProp,
    onChange,
    size = 'medium',
    value = '',
    name,
    innerRef,
    placeholder,
    id: idProp,
    minRows = 4,
    maxRows = 10,
    required = false,
    readOnly,
    disabled,
    'aria-label': ariaLabel,
    ...otherProps
}: TextareaProps) {
    const { id, ariaDescribedBy, ariaErrorMessage, invalid } = useFieldInit({
        idProp,
        required,
        disabled,
        readOnly,
        invalidProp,
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
            data-disabled={disabled || undefined}
            data-invalid={invalid || undefined}
            data-read-only={readOnly || undefined}
            data-size={size}
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
                aria-label={ariaLabel || undefined}
                disabled={disabled}
                id={id}
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
