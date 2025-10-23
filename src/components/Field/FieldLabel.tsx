import { ElementType } from 'react';
import { FieldContext, useFieldContext, labelledById } from './utils';
import { ElementProps } from '-/types/common';

export type FieldLabelProps<As extends ElementType = ElementType> = Pick<FieldContext, 'labelTrailing' | 'required'> & {
    /** The label text. */
    children: string;
    /**
     * The element type to render as.
     *
     * @default label
     * @type ElementType
     */
    as?: As;
};

export function FieldLabel<As extends ElementType = 'label'>({
    children,
    labelTrailing,
    as,
    ...props
}: ElementProps<FieldLabelProps<As>, As>) {
    const As = as || 'label';

    const { required = false, id, htmlFor, ...context } = useFieldContext();

    return (
        <As data-bspk="field-label" htmlFor={htmlFor} id={labelledById(id)} {...props}>
            <span>{children}</span>
            {required && <span data-required>{' (Required)'}</span>}
            {(labelTrailing || context.labelTrailing) && (
                <span aria-hidden data-trailing>
                    {labelTrailing || context.labelTrailing}
                </span>
            )}
        </As>
    );
}
