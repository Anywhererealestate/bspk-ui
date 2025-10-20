import { Password, PasswordProps } from './Password';
import { FormField, FormFieldControlProps } from '-/components/Field';

export type PasswordFieldProps = FormFieldControlProps<PasswordProps>;

/**
 * /** A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component takes properties from the FormField and Password component.
 *
 * @name PasswordField
 * @phase UXReview
 *
 * @export
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
