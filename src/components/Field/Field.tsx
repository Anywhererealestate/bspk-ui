import './field.scss';
import { Children, ElementType, isValidElement, ReactNode, useMemo, useState } from 'react';

import { describedById, errorMessageId, fieldContext, FieldContext, labelledById } from './utils';
import { ElementProps } from '-/types/common';
import { randomString } from '-/utils/random';

export type FieldProps<As extends ElementType = ElementType> = {
    /**
     * The children of the form field. This should be a control such as DatePicker, Input, InputNumber, InputPhone,
     * Password, Select, Textarea, or TimePicker.
     *
     * @required
     */
    children: ReactNode;
    /**
     * The element type to render the field as.
     *
     * @default div
     * @type ElementType
     */
    as?: As;
    /** The unique id for the field. */
    id?: string;
};

const isComponentName = (
    child: React.ReactElement<unknown, React.JSXElementConstructor<unknown> | string> | React.ReactPortal,
    name: string,
) => {
    const componentType = child.type as { name?: string; displayName?: string };
    return componentType.displayName === name || componentType.name === name;
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
 *     () => {
 *         const [state, setState] = useState<string | undefined>(undefined);
 *         const [error, setError] = useState<string | undefined>(undefined);
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
 *     };
 *
 * @name Field
 * @phase Utility
 */
export function Field<As extends ElementType = ElementType>({
    children,
    as,
    id: idProp,
    ...props
}: ElementProps<FieldProps<As>, As>) {
    const id = useMemo(() => idProp || `field-${randomString(8)}`, [idProp]);

    const childContext = useMemo(() => {
        const next: Pick<FieldContext, 'ariaDescribedBy' | 'ariaErrorMessage' | 'ariaLabelledBy'> = {};
        Children.forEach(children, (child) => {
            if (!isValidElement(child) || typeof child.type === 'string' || !child.props.children) return;

            if (isComponentName(child, 'FieldError')) next.ariaErrorMessage = errorMessageId(id);
            else if (isComponentName(child, 'FieldLabel')) next.ariaLabelledBy = labelledById(id);
            else if (isComponentName(child, 'FieldDescription')) next.ariaDescribedBy = describedById(id);
        });
        return next;
    }, [children, id]);

    const [contextState, setContext] = useState<Pick<FieldContext, 'htmlFor' | 'required'>>({});

    const As = as || 'div';

    return (
        <fieldContext.Provider
            value={{
                ...childContext,
                ...contextState,
                id,
                setContext,
            }}
        >
            <As {...props} data-bspk-utility="field" id={id} role="group">
                {children}
            </As>
        </fieldContext.Provider>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
