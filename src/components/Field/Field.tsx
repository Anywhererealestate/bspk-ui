import './field.scss';
import { ReactNode } from 'react';

import { labelledById, errorMessageId, describedById } from './utils';
import { InlineAlert } from '-/components/InlineAlert';
import { CommonProps } from '-/types/common';

/**
 * Props for Composed Field components.
 *
 * These are props that combine FieldProps with the props of a specific control component.
 */
export type ComposedFieldProps<P extends Record<string, unknown>> = Omit<FieldProps, 'children' | 'controlId'> &
    Omit<P, keyof FieldProps>;

export type FieldProps = CommonProps<'style'> & {
    /** Displays an error message and marks the field as invalid. */
    errorMessage?: string;
    /**
     * The label of the field.
     *
     * @required
     */
    label: string;
    /**
     * This text provides additional context or instructions for the field.
     *
     * If an errorMessage is present, the helperText will not be displayed.
     */
    helperText?: string;
    /** The trailing element of the label. */
    labelTrailing?: string;
    /** Marks the field as required. */
    required?: boolean;
    /**
     * The children of the field. This should be a control such as DatePicker, Input, InputNumber, InputPhone, Password,
     * Select, Textarea, or TimePicker.
     *
     * @required
     */
    children: ReactNode;
    /**
     * The id attribute of the form control rendered in children (e.g., Input, Select, Textarea). Used to associate the
     * label (htmlFor) with the control for accessibility. Must exactly match the control's id.
     *
     * @required
     */
    controlId: string;
};

/**
 * Wrapper component for form controls.
 *
 * Children should be one of the following: DatePicker, Input, InputNumber, InputPhone, Password, Select, Textarea,
 * RadioGroup, CheckboxGroup, or TimePicker.
 *
 * @example
 *     import { Input } from '@bspk/ui/Input';
 *     import { Field } from '@bspk/ui/Field';
 *
 *     () => {
 *         const [state, setState] = useState<string | undefined>(undefined);
 *
 *         return (
 *             <Field controlId="example-control-id" helperText="This is an example description." label="Example label">
 *                 <Input
 *                     aria-label="example aria-label"
 *                     id="example-control-id"
 *                     name="example-text"
 *                     onChange={(next) => {
 *                         setState(next);
 *                     }}
 *                     value={state}
 *                 />
 *             </Field>
 *         );
 *     };
 *
 * @name Field
 * @phase Utility
 */
export function Field({
    children,
    label,
    helperText,
    labelTrailing,
    errorMessage,
    required,
    controlId: id,
    ...props
}: FieldProps) {
    return (
        <div {...props} data-bspk-utility="field" role="group">
            <label data-field-label htmlFor={id} id={labelledById(id)}>
                <span>{label}</span>
                {required && <span data-required>{' (Required)'}</span>}
                {labelTrailing && (
                    <span aria-hidden data-trailing>
                        {labelTrailing}
                    </span>
                )}
            </label>
            {children}
            {errorMessage ? (
                <InlineAlert id={errorMessageId(id)} label={errorMessage} owner="field-error" variant="error" />
            ) : (
                helperText && (
                    <p data-field-description id={describedById(id)}>
                        {helperText}
                    </p>
                )
            )}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
