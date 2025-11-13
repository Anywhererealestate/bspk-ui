import { useFieldContext, describedById } from './utils';

/**
 * FieldDescription component displays a description associated with a form field.
 *
 * @name FieldDescription
 * @parent Field
 */
export function FieldDescription({ children }: { children?: string }) {
    const { id } = useFieldContext();

    return children ? (
        <p data-bspk="field-description" id={describedById(id)}>
            {children}
        </p>
    ) : null;
}
