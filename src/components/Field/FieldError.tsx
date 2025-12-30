import { errorMessageId, useFieldContext } from './utils';
import { InlineAlert } from '-/components/InlineAlert';

export type FieldErrorProps = {
    /** The error message text. */
    label?: string;
};

/**
 * FieldError component displays an error message associated with a form field.
 *
 * @name FieldError
 * @parent Field
 */
export function FieldError({ label }: FieldErrorProps) {
    const { id } = useFieldContext();

    return label && <InlineAlert id={errorMessageId(id)} label={label} owner="field-error" variant="error" />;
}
