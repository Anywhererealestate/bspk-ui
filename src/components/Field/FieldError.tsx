import { useEffect } from 'react';
import { useFieldContext } from './utils';
import { InlineAlert } from '-/components/InlineAlert';

export function FieldError({ children }: { children?: string }) {
    const { setField, id, hasError } = useFieldContext();

    useEffect(() => {
        if (setField && hasError !== !!children) setField({ hasError: !!children });
    }, [children, setField, hasError]);
    return children ? (
        <InlineAlert id={`${id}-error`} owner="field-error" variant="error">
            {children}
        </InlineAlert>
    ) : null;
}
