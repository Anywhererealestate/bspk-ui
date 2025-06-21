import './form-field.scss';
import { InlineAlert } from './InlineAlert';
import { Layout } from './Layout';
import { Txt } from './Txt';

import { CommonProps, InvalidPropsLibrary } from './';

export type FieldControlProps = {
    /**
     * Marks the element as invalid and displays error message.
     *
     * @default false
     */
    invalid?: boolean;
    /** The id of the control description. */
    'aria-describedby'?: string;
    /** The id of the error message */
    'aria-errormessage'?: string;
};

export type FormFieldProps = CommonProps<'required'> &
    InvalidPropsLibrary & {
        /**
         * The label of the field.
         *
         * @required
         */
        label: string;
        /** The id of the control. */
        controlId: string;
        /**
         * The children of the form field. This should be a control such as TextInput, Select, DatePicker, or
         * TimePicker.
         *
         * @type (childProps: FieldControlProps) => JSX.Element
         * @required
         */
        children: (childProps: FieldControlProps) => JSX.Element;
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
 * @phase Backlog
 */
function FormField({
    label,
    invalid,
    errorMessage: errorMessageProp,
    helperText: helperTextProp,
    children,
    labelTrailing,
    controlId,
    required,
}: FormFieldProps) {
    const errorMessage = invalid && errorMessageProp ? errorMessageProp : undefined;
    const errorMessageId = errorMessage ? `${controlId}-error-message` : undefined;
    const helperText = !invalid && helperTextProp ? helperTextProp : undefined;
    const helperTextId = !errorMessage && helperText ? `${controlId}-helper-text` : undefined;

    if (typeof children !== 'function') return null;

    return (
        <div data-bspk="form-field" data-invalid={invalid || undefined}>
            <Layout as="div">
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
            </Layout>
            {children({
                invalid,
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

FormField.bspkName = 'FormField';

export { FormField };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
