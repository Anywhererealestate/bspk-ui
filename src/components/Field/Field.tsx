import './field.scss';
import { ReactNode, useState } from 'react';
import { fieldContext, FieldContextProps } from './utils';
import { ElementProps } from '-/types/common';
import { randomString } from '-/utils/random';

export type FieldProps = {
    /**
     * The children of the form field. This should be a control such as DatePicker, Input, InputNumber, InputPhone,
     * Password, Select, Textarea, or TimePicker.
     *
     * @required
     */
    children: ReactNode;
};

/**
 * Wrapper component for form controls.
 *
 * Children should be one of the following: DatePicker, Input, InputNumber, InputPhone, Password, Select, Textarea, or
 * TimePicker.
 *
 * @example
 *     import { Input } from '@bspk/ui/Input';
 *     import { Field, FieldLabel, FieldDescription, FieldError } from '@bspk/ui/Field';
 *
 *     function Example() {
 *         const [state, setState] = React.useState<string | undefined>(undefined);
 *         const [error, setError] = React.useState<string | undefined>(undefined);
 *
 *         return (
 *             <Field label="Example label">
 *                 <FieldLabel>Example label</FieldLabel>
 *                 <Input
 *                     aria-label="example aria-label"
 *                     name="example-text"
 *                     onChange={(next) => {
 *                         setState(next);
 *                     }}
 *                     value={state}
 *                     {...fieldProps}
 *                 />
 *                 <FieldDescription>This is an example description.</FieldDescription>
 *                 {error && <FieldError>{error}</FieldError>}
 *             </Field>
 *         );
 *     }
 *
 * @name Field
 * @phase Utility
 */
export function Field({ children, ...props }: ElementProps<FieldProps, 'div'>) {
    const [fieldContextValue, setFieldContextValue] = useState<FieldContextProps>(() => ({
        id: `field-${randomString()}`,
    }));

    return (
        <fieldContext.Provider
            value={{
                ...fieldContextValue,
                setField: (partial) => setFieldContextValue((prev) => ({ ...prev, ...partial })),
            }}
        >
            <div
                {...props}
                data-bspk-utility="field"
                data-invalid={fieldContextValue.invalid || undefined}
                role="group"
            >
                {children}
            </div>
        </fieldContext.Provider>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
