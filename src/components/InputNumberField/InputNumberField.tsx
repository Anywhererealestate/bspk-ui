import { Field, ComposedFieldProps, propsWithAria } from '-/components/Field';
import { InputNumber, InputNumberProps } from '-/components/InputNumber';
import { useId } from '-/hooks/useId';

export type InputNumberFieldProps = ComposedFieldProps<InputNumberProps>;

/**
 * A field wrapper for the InputNumber component.
 *
 * This component takes properties from the FormField and InputNumber components.
 *
 * @name InputNumberField
 * @phase UXReview
 *
 * @generated
 */
export function InputNumberField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    style,
    id: idProp,
    ...controlProps
}: InputNumberFieldProps) {
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
            <InputNumber {...propsWithAria({ id, controlProps, errorMessage, helperText })} />
        </Field>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
