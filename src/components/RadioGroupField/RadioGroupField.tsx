import { Field, FieldDescription, FieldError, FieldLabel } from '-/components/Field';
import { FormFieldControlProps } from '-/components/FormField';
import { RadioGroup, RadioGroupProps } from '-/components/RadioGroup';

export type RadioGroupFieldProps = FormFieldControlProps<RadioGroupProps>;

/**
 * A field wrapper for the RadioGroup component.
 *
 * This component takes properties from the FormField and RadioGroup components.
 *
 * @name RadioGroupField
 * @phase Stable
 *
 * @generated
 */
export function RadioGroupField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    style,
    ...controlProps
}: RadioGroupFieldProps) {
    return (
        <Field as="fieldset">
            <FieldLabel as="legend" labelTrailing={labelTrailing} style={style}>
                {label}
            </FieldLabel>
            <RadioGroup {...controlProps} />
            {!errorMessage && helperText && <FieldDescription>{helperText}</FieldDescription>}
            {errorMessage && <FieldError>{errorMessage}</FieldError>}
        </Field>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
