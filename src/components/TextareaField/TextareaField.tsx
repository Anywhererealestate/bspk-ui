import { Field, ComposedFieldProps, propsWithAria } from '-/components/Field';
import { Textarea, TextareaProps } from '-/components/Textarea';
import { useId } from '-/hooks/useId';

export type TextareaFieldProps = ComposedFieldProps<TextareaProps>;

/**
 * A field wrapper for the Textarea component.
 *
 * This component takes properties from the FormField and Textarea components.
 *
 * @name TextareaField
 * @phase UXReview
 *
 * @generated
 */
export function TextareaField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    style,
    id: idProp,
    ...controlProps
}: TextareaFieldProps) {
    const id = useId(idProp);
    return (
        <Field
            controlId={id}
            errorMessage={errorMessage}
            helperText={helperText}
            label={label}
            labelTrailing={labelTrailing}
            required={controlProps.required}
            style={style}
        >
            <Textarea {...propsWithAria({ id, controlProps, errorMessage, helperText })} />
        </Field>
    );
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
