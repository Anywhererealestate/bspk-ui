import { FormField, FormFieldControlProps } from '-/components/FormField';
import { Password, PasswordProps } from '-/components/Password';

export type PasswordFieldProps = FormFieldControlProps<PasswordProps>;

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
export function PasswordField({ label, helperText, labelTrailing, errorMessage, ...controlProps }: PasswordFieldProps) {
    return (
        <FormField errorMessage={errorMessage} helperText={helperText} label={label} labelTrailing={labelTrailing}>
            <Password {...controlProps} />
        </FormField>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
