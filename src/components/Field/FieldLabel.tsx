import { useFieldContext } from './utils';
import { ElementProps } from '-/types/common';

export type FieldLabelProps = {
    /** The label text. */
    children: string;
    /** Whether the field is required. */
    required?: boolean;
    /** An optional trailing element to display in the label, such as an info icon. */
    trailing?: React.ReactNode;
};

export function FieldLabel({
    children,
    required,
    trailing,
    ...props
}: ElementProps<FieldLabelProps, 'label', 'htmlFor'>) {
    const { id } = useFieldContext();

    return (
        <label data-bspk="field-label" htmlFor={id} {...props}>
            <span>{children}</span>
            {required && <span data-required>{' (Required)'}</span>}
            <span data-trailing>{trailing}</span>
        </label>
    );
}
