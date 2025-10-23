import { ReactNode } from 'react';
import { Field, FieldLabel, FieldDescription, FieldError, FieldContext } from '-/components/Field';

export type FormFieldControlProps<P extends Record<string, unknown>> = Omit<FormFieldProps, 'children'> &
    Omit<P, keyof FormFieldProps>;

export type FormFieldProps = Pick<FieldContext, 'labelTrailing'> & {
    /** Displays an error message and marks the field as invalid. */
    errorMessage?: string;
    /**
     * The label of the field.
     *
     * @required
     */
    label: string;
    /** Whether to visually hide the label. */
    hideLabel?: boolean;
    /**
     * The children of the form field. This should at least contain a FieldLabel component and a control such as
     * DatePicker, Input, InputNumber, InputPhone, Password, Select, Textarea, or TimePicker.
     *
     * Other components such as FieldDescription and FieldError can also be included.
     *
     * @required
     */
    children: ReactNode;
    /**
     * This text provides additional context or instructions for the field.
     *
     * If an errorMessage is present, the helperText will not be displayed.
     */
    helperText?: string;
};
/**
 * Wrapper component for form controls.
 *
 * Children should be one of the following: DatePicker, Input, InputNumber, InputPhone, Password, Select, Textarea, or
 * TimePicker.
 *
 * @example
 *     import { Input } from '@bspk/ui/Input';
 *     import { FormField } from '@bspk/ui/FormField';
 *
 *     function Example() {
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
export function FormField({ label, errorMessage, helperText, children, labelTrailing, hideLabel }: FormFieldProps) {
    return (
        <Field>
            <FieldLabel data-sr-only={hideLabel || undefined} labelTrailing={labelTrailing}>
                {label}
            </FieldLabel>
            {children}
            {!errorMessage && helperText && <FieldDescription>{helperText}</FieldDescription>}
            <FieldError>{errorMessage}</FieldError>
        </Field>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
