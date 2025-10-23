import { errorMessageId, useFieldContext } from './utils';
import { InlineAlert } from '-/components/InlineAlert';

export type FieldErrorProps = {
    /** The error message text. */
    children?: string;
};

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
