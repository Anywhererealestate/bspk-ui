import { FieldContextProps, useFieldContext } from './utils';
import { ElementProps } from '-/types/common';

export type FieldLabelProps = Pick<FieldContextProps, 'labelTrailing' | 'required'> & {
    /** The label text. */
    children: string;
};

export function FieldLabel({ children, labelTrailing, ...props }: ElementProps<FieldLabelProps, 'label', 'htmlFor'>) {
    const { id, required, htmlFor, ...context } = useFieldContext();

    return (
        <label data-bspk="field-label" htmlFor={htmlFor === false ? undefined : id} id={`${id}-field-label`} {...props}>
            <span>{children}</span>
            {required && <span data-required>{' (Required)'}</span>}
            {(labelTrailing || context.labelTrailing) && (
                <span aria-hidden data-trailing>
                    {labelTrailing || context.labelTrailing}
                </span>
            )}
        </label>
    );
}
