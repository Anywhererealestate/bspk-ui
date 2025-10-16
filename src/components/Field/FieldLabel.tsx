import { useFieldContext } from './utils';
import { ElementProps } from '-/types/common';

export type FieldLabelProps = {
    /** The label text. */
    children: string;
};

export function FieldLabel({ children, ...props }: ElementProps<FieldLabelProps, 'label', 'htmlFor'>) {
    const { id, required, labelTrailing: trailing } = useFieldContext();

    return (
        <label data-bspk="field-label" htmlFor={id} {...props}>
            <span>{children}</span>
            {required && <span data-required>{' (Required)'}</span>}
            {trailing && (
                <span aria-hidden data-trailing>
                    {trailing}
                </span>
            )}
        </label>
    );
}
