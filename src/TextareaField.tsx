import { FormField, FormFieldProps } from './FormField';
import { Textarea, TextareaProps } from './Textarea';
import { Txt } from './Txt';
import { tryIntParse } from './utils/tryIntPsrse';

export type TextareaFieldProps = Pick<FormFieldProps, 'controlId' | 'errorMessage' | 'helperText' | 'label'> &
    TextareaProps;
/**
 * A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and Textarea components.
 *
 * @name TextareaField
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
    ...textareaProps
}: TextareaFieldProps) {
    const maxLength = tryIntParse(maxLengthProp) || -1;
    const errorMessage = (!readOnly && !disabled && errorMessageProp) || undefined;

    if (typeof onChange !== 'function') return null;

    return (
        <FormField
            controlId={id}
            errorMessage={errorMessage}
            helperText={helperText}
            label={label}
            labelTrailing={
                <Txt style={{ color: 'var(--foreground-neutral-on-surface-variant-02)' }} variant="body-small">
                    {`${textareaProps?.value?.length || 0}${maxLength > 0 ? `/${maxLength}` : ''}`}
                </Txt>
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
