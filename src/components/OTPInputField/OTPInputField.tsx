import { Field, ComposedFieldProps, propsWithAria } from '-/components/Field';
import { OTPInput, OTPInputProps } from '-/components/OTPInput';
import { useId } from '-/hooks/useId';

export type OTPInputFieldProps = ComposedFieldProps<OTPInputProps>;

/**
 * A field wrapper for the OTPInput component.
 *
 * This component takes properties from the FormField and OTPInput components.
 *
 * @name OTPInputField
 * @phase UXReview
 *
 * @generated
 */
export function OTPInputField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    style,
    id: idProp,
    ...controlProps
}: OTPInputFieldProps) {
    const id = useId(idProp);
    return (
        <Field
            controlId={id}
            errorMessage={errorMessage}
            helperText={helperText}
            label={label}
            labelTrailing={labelTrailing}
            style={style}
            required={controlProps.required}
        >
            <OTPInput {...propsWithAria({ id, controlProps, errorMessage, helperText })} />
        </Field>
    );
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
