import { FormField, FormFieldControlProps } from '-/components/FormField';
import { RadioGroup, RadioGroupProps } from '-/components/RadioGroup';

export type RadioGroupFieldProps = FormFieldControlProps<RadioGroupProps>;

/**
 * A field wrapper for the RadioGroup component.
 *
 * This component takes properties from the FormField and RadioGroup components.
 *
 * @name RadioGroupField
 * @phase UXReview
 *
 * @generated
 */
export function RadioGroupField({
    label,
    helperText,
    labelTrailing,
    errorMessage,
    ...controlProps
}: RadioGroupFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <RadioGroup {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
