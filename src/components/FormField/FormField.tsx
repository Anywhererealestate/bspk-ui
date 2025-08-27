import { InlineAlert } from '-/components/InlineAlert';
import { Txt } from '-/components/Txt';
import { CommonProps, ElementProps, FormFieldControlProps } from '-/types/common';

import './form-field.scss';

// omits are usually a code smell, but in this case, we need to ensure we get all the props from child components
export type FormFieldWrapProps<T extends Record<string, unknown>> = Omit<FormFieldProps, keyof T | 'children'> &
    Omit<T, 'aria-describedby' | 'aria-errormessage'>;

export type FormFieldProps = CommonProps<'invalid' | 'required'> & {
    /** The error message to display when the field is invalid. */
    errorMessage?: string;
    /**
     * The label of the field.
     *
     * @required
     */
    label: string;
    /** The id of the control. */
    controlId: string;
    /**
     * The children of the form field. This should be a control such as TextInput, Select, DatePicker, or TimePicker.
     *
     * @type (childProps: FormFieldControlProps) => JSX.Element
     * @required
     */
    children: (childProps: FormFieldControlProps) => JSX.Element;
    /** The helperText of the field. */
    helperText?: string;
    /** The trailing element of the label. */
    labelTrailing?: React.ReactNode;
};

/**
 * Wrapper component for form controls.
 *
 * Children may be one of the following: TextInput, Select, DatePicker, or TimePicker.
 *
 * @example
 *     import { TextInput } from '@bspk/ui/TextInput';
 *     import { FormField } from '@bspk/ui/FormField';
 *
 *     export function Example() {
 *         const [state, setState] = React.useState<string | undefined>(undefined);
 *         return (
 *             <FormField controlId="Example controlId" label="Example label">
 *                 {(fieldProps) => {
 *                     return (
 *                         <TextInput
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
export function FormField({
    label,
    invalid,
    errorMessage: errorMessageProp,
    helperText: helperTextProp,
    children,
    labelTrailing,
    controlId,
    required,
}: ElementProps<FormFieldProps, 'div'>) {
    const errorMessage = invalid && errorMessageProp ? errorMessageProp : undefined;
    const errorMessageId = errorMessage ? `${controlId}-error-message` : undefined;
    const helperText = !errorMessage && helperTextProp ? helperTextProp : undefined;
    const helperTextId = !errorMessage && helperText ? `${controlId}-helper-text` : undefined;

    if (typeof children !== 'function') return null;

    return (
        <div data-bspk="form-field" data-invalid={invalid || undefined}>
            <header>
                <label htmlFor={controlId}>
                    <Txt as="span" variant="labels-small">
                        {label}
                    </Txt>
                    {required && (
                        <Txt as="span" variant="body-small">
                            {' (Required)'}
                        </Txt>
                    )}
                </label>
                {labelTrailing}
            </header>
            {children({
                'aria-describedby': helperTextId,
                'aria-errormessage': errorMessageId,
            })}
            {errorMessage && (
                <InlineAlert id={errorMessageId} variant="error">
                    {errorMessage}
                </InlineAlert>
            )}
            {helperText && (
                <Txt id={helperTextId} variant="body-small">
                    {helperText}
                </Txt>
            )}
        </div>
    );
}


/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
