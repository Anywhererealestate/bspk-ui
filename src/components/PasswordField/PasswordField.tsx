import { Field, ComposedFieldProps, propsWithAria } from '-/components/Field';
import { Password, PasswordProps } from '-/components/Password';
import { useId } from '-/hooks/useId';

export type PasswordFieldProps = ComposedFieldProps<PasswordProps>;

/**
 * A field wrapper for the Password component.
 *
 * This component takes properties from the FormField and Password components.
 *
 * @name PasswordField
 * @phase UXReview
 *
 * @generated
 */
export function PasswordField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    style,
    id: idProp,
    ...controlProps
}: PasswordFieldProps) {
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
            <Password {...propsWithAria({ id, controlProps, errorMessage, helperText })} />
        </Field>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
