import { useEffect } from 'react';
import { useFieldContext } from './utils';

export function FieldDescription({ children }: { children?: string }) {
    const { setField, id, ariaDescribedBy } = useFieldContext();

    useEffect(() => {
        if (setField && !!ariaDescribedBy !== !!children)
            setField({ ariaDescribedBy: children ? `${id}-description` : undefined });
    }, [children, setField, ariaDescribedBy, id]);

    return children ? (
        <p data-bspk="field-description" id={`${id}-description`}>
            {children}
        </p>
    ) : null;
}
