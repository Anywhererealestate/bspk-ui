import { useFieldContext, describedById } from './utils';

function FieldDescription({ children }: { children?: string }) {
    const { id } = useFieldContext();

    return children ? (
        <p data-bspk="field-description" id={describedById(id)}>
            {children}
        </p>
    ) : null;
}

FieldDescription.displayName = 'FieldDescription';

export { FieldDescription };
