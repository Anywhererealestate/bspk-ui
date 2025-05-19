import './form-field.scss';
import { InlineAlert } from './InlineAlert';
import { Layout } from './Layout';
import { Txt } from './Txt';

import { CommonProps } from './';

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

export type FormFieldProps = CommonProps<'errorMessage' | 'required'> & {
    /**
     * The label of the field.
     *
     * @required
     */
    label: string;
    /** The id of the control. */
    controlId: string;
    /**
     * The children of the form field. This should be a control such as TextInput, Dropdown, DatePicker, or TimePicker.
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
 * Children may be one of the following: TextInput, Dropdown, DatePicker, or TimePicker.
 *
 * @name FormField
 */
function FormField({ label, errorMessage, helperText, children, labelTrailing, controlId, required }: FormFieldProps) {
    const errorMessageId = errorMessage && `${controlId}-error-message`;
    const helperTextId = helperText && `${controlId}-helper-text`;

    if (typeof children !== 'function') return null;

    return (
        <div data-bspk="form-field">
            <Layout as="header">
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
                invalid: !!errorMessage,
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
