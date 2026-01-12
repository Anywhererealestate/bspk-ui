import { Field, ComposedFieldProps, propsWithAria } from '-/components/Field';
import { Input, InputProps } from '-/components/Input';
import { useId } from '-/hooks/useId';

export type InputFieldProps = ComposedFieldProps<InputProps>;

/**
 * A field wrapper for the Input component.
 *
 * This component takes properties from the FormField and Input components.
 *
 * @name InputField
 * @phase UXReview
 *
 * @generated
 */
export function InputField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    style,
    id: idProp,
    ...controlProps
}: InputFieldProps) {
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
            <Input {...propsWithAria({ id, controlProps, errorMessage, helperText })} />
        </Field>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
