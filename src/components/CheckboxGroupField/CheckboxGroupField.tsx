import { CheckboxGroup, CheckboxGroupProps } from '-/components/CheckboxGroup';
import { Field, FieldDescription, FieldError, FieldLabel } from '-/components/Field';
import { FormFieldControlProps } from '-/components/FormField';

export type CheckboxGroupFieldProps = FormFieldControlProps<CheckboxGroupProps>;

/**
 * A field wrapper for the CheckboxGroup component.
 *
 * This component takes properties from the FormField and CheckboxGroup components.
 *
 * @name CheckboxGroupField
 * @phase UXReview
 *
 * @generated
 */
export function CheckboxGroupField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    ...controlProps
}: CheckboxGroupFieldProps) {
    return (
        <Field as="fieldset">
            <FieldLabel as="legend" labelTrailing={labelTrailing}>
                {label}
            </FieldLabel>
            <CheckboxGroup {...controlProps} />
            {!errorMessage && helperText && <FieldDescription>{helperText}</FieldDescription>}
            {errorMessage && <FieldError>{errorMessage}</FieldError>}
        </Field>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
