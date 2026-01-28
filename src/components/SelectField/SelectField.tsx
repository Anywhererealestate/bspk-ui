import { Field, ComposedFieldProps, propsWithAria } from '-/components/Field';
import { Select, SelectProps } from '-/components/Select';
import { useId } from '-/hooks/useId';

export type SelectFieldProps = ComposedFieldProps<SelectProps>;

/**
 * A field wrapper for the Select component.
 *
 * This component takes properties from the FormField and Select components.
 *
 * @name SelectField
 * @phase UXReview
 *
 * @generated
 */
export function SelectField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    style,
    id: idProp,
    ...controlProps
}: SelectFieldProps) {
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
            <Select {...propsWithAria({ id, controlProps, errorMessage, helperText })} />
        </Field>
    );
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
