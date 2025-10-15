import { useEffect } from 'react';
import { useFieldContext } from './utils';

export function FieldDescription({ children }: { children?: string }) {
    const { setField, id, hasDescription } = useFieldContext();

    useEffect(() => {
        if (setField && hasDescription !== !!children) setField({ hasDescription: !!children });
    }, [children, setField, hasDescription]);

    return children ? (
        <p data-bspk="field-description" id={`${id}-description`}>
            {children}
        </p>
    ) : null;
}
