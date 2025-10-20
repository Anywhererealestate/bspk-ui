import { ReactNode } from 'react';
import { FieldDescription } from './FieldDescription';
import { FieldError } from './FieldError';
import { Field, FieldLabel } from '.';

export type FormFieldControlProps<P extends Record<string, unknown>> = Omit<FormFieldProps, 'children'> &
    Omit<P, keyof FormFieldProps>;

export type FormFieldProps = {
    /** The error message to display when the field is invalid. */
    errorMessage?: string;
    /**
     * The label of the field.
     *
     * @required
     */
    label: string;
    /**
     * The children of the form field. This should be a control such as Input, Select, DateInput, or TimeInput.
     *
     * @required
     */
    children: ReactNode;
    /** The helperText of the field. */
    helperText?: string;
    /** The trailing element of the label. */
    labelTrailing?: React.ReactNode;
};
/**
 * Wrapper component for form controls.
 *
 * Children should be one of the following: Input, Select, DateInput or TimeInput.
 *
 * @example
 *     import { Input } from '@bspk/ui/Input';
 *     import { FormField } from '@bspk/ui/FormField';
 *
 *     export function Example() {
 *         const [state, setState] = React.useState<string | undefined>(undefined);
 *         return (
 *             <FormField controlId="Example controlId" label="Example label">
 *                 {(fieldProps) => {
 *                     return (
 *                         <Input
 *                             aria-label="example aria-label"
 *                             name="example-text"
 *                             onChange={(next) => {
 *                                 setState(next);
 *                             }}
 *                             value={state}
 *                             {...fieldProps}
 *                         />
 *                     );
 *                 }}
 *             </FormField>
 *         );
 *     }
 *
 * @name FormField
 * @phase Utility
 */
export function FormField({ label, errorMessage, helperText, children, labelTrailing }: FormFieldProps) {
    return (
        <Field>
            <FieldLabel labelTrailing={labelTrailing}>{label}</FieldLabel>
            {children}
            <FieldDescription>{helperText}</FieldDescription>
            <FieldError>{errorMessage}</FieldError>
        </Field>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
