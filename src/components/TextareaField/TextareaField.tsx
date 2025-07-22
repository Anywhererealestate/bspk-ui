import { FormFieldProps, FormField } from '-/components/FormField';
import { TextareaProps, Textarea } from '-/components/Textarea';
import { Txt } from '-/components/Txt';
import { tryIntParse } from '-/utils/tryIntPsrse';

export type TextareaFieldProps = Pick<FormFieldProps, 'controlId' | 'helperText' | 'label'> &
    TextareaProps & {
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
 * This component takes properties from the FormField and Textarea components.
 *
 * @example
 *     import { useState } from 'react';
 *     import { TextareaField } from '@bspk/ui/TextareaField';
 *
 *     export function Example() {
 *         const [value, setValue] = useState<string>();
 *
 *         return (
 *             <TextareaField
 *                 aria-label="Example aria-label"
 *                 controlId="Example controlId"
 *                 label="Example label"
 *                 name="Example name"
 *                 onChange={setValue}
 *                 value={value}
 *             />
 *         );
 *     }
 *
 * @name TextareaField
 * @phase EngineeringReview
 */
function TextareaField({
    label,
    errorMessage: errorMessageProp,
    helperText,
    controlId: id,
    onChange,
    maxLength: maxLengthProp,
    invalid,
    readOnly,
    disabled,
    required,
    characterCount = true,
    ...textareaProps
}: TextareaFieldProps) {
    const maxLength = tryIntParse(maxLengthProp) || -1;
    const errorMessage = (!readOnly && !disabled && errorMessageProp) || undefined;

    if (typeof onChange !== 'function') return null;

    return (
        <FormField
            controlId={id}
            data-bspk="textarea-field"
            errorMessage={errorMessage}
            helperText={helperText}
            invalid={invalid}
            label={label}
            labelTrailing={
                characterCount && (
                    <Txt
                        style={{
                            color: 'var(--foreground-neutral-on-surface-variant-02)',
                        }}
                        variant="body-small"
                    >
                        {`${textareaProps?.value?.length || 0}${maxLength > 0 ? `/${maxLength}` : ''}`}
                    </Txt>
                )
            }
            required={required}
        >
            {(fieldProps) => (
                <Textarea
                    {...textareaProps}
                    {...fieldProps}
                    aria-label={textareaProps['aria-label'] || label}
                    id={id}
                    invalid={invalid}
                    onChange={(next, event) => {
                        onChange(next, event);
                    }}
                    required={required}
                />
            )}
        </FormField>
    );
}

TextareaField.bspkName = 'TextareaField';

export { TextareaField };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
