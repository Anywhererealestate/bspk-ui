import { FormFieldWrapProps, FormField } from '-/components/FormField';
import { TextareaProps, Textarea } from '-/components/Textarea';
import { Txt } from '-/components/Txt';
import { tryIntParse } from '-/utils/tryIntPsrse';

export type TextareaFieldProps = FormFieldWrapProps<TextareaProps> & {
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
 * @phase UXReview
 */
export function TextareaField({
    label,
    helperText,
    controlId,
    required,
    invalid,
    characterCount,
    ...inputProps
}: TextareaFieldProps) {
    const maxLength = tryIntParse(inputProps.maxLength) || -1;

    return (
        <FormField
            controlId={controlId}
            data-bspk="textarea-field"
            helperText={helperText}
            invalid={invalid}
            label={label}
            labelTrailing={
                // If characterCount is falsey, we don't want to show the labelTrailing
                characterCount && (
                    <Txt
                        style={{
                            color: 'var(--foreground-neutral-on-surface-variant-02)',
                        }}
                        variant="body-small"
                    >
                        {`${inputProps?.value?.length || 0}${maxLength > 0 ? `/${maxLength}` : ''}`}
                    </Txt>
                )
            }
            required={required}
        >
            {(fieldProps) => (
                <Textarea
                    //
                    {...inputProps}
                    {...fieldProps}
                    invalid={invalid}
                />
            )}
        </FormField>
    );
}


/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
