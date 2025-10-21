import { useEffect } from 'react';
import { useFieldContext } from './utils';
import { InlineAlert } from '-/components/InlineAlert';

export function FieldError({ children }: { children?: string }) {
    const { setField, id, ariaErrorMessage, ...context } = useFieldContext();

    useEffect(() => {
        if (setField && !!ariaErrorMessage !== !!children)
            setField({ ariaErrorMessage: children ? `${id}-error` : undefined });
    }, [children, setField, ariaErrorMessage, id]);

    if (context.disabled || context.readOnly) return null;

    return (
        children && (
            <InlineAlert id={`${id}-error`} owner="field-error" variant="error">
                {children}
            </InlineAlert>
        )
    );
}
