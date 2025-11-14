import { errorMessageId, useFieldContext } from './utils';
import { InlineAlert } from '-/components/InlineAlert';

export type FieldErrorProps = {
    /** The error message text. */
    children?: string;
};

/**
 * FieldError component displays an error message associated with a form field.
 *
 * @name FieldError
 * @parent Field
 */
export function FieldError({ children }: FieldErrorProps) {
    const { id } = useFieldContext();

    return (
        children && (
            <InlineAlert id={errorMessageId(id)} owner="field-error" variant="error">
                {children}
            </InlineAlert>
        )
    );
}
