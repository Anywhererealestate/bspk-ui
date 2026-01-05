import { Field, ComposedFieldProps, propsWithAria } from '-/components/Field';
import { InputPhone, InputPhoneProps } from '-/components/InputPhone';
import { useId } from '-/hooks/useId';

export type InputPhoneFieldProps = ComposedFieldProps<InputPhoneProps>;

/**
 * A field wrapper for the InputPhone component.
 *
 * This component takes properties from the FormField and InputPhone components.
 *
 * @name InputPhoneField
 * @phase UXReview
 *
 * @generated
 */
export function InputPhoneField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    style,
    id: idProp,
    ...controlProps
}: InputPhoneFieldProps) {
    const id = useId(idProp);
    return (
        <Field
            controlId={id}
            errorMessage={errorMessage}
            helperText={helperText}
            label={label}
            labelTrailing={labelTrailing}
            style={style}
        >
            <InputPhone {...propsWithAria({ id, controlProps, errorMessage, helperText })} />
        </Field>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
