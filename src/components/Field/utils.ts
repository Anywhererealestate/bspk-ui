import { createContext, useContext, useEffect } from 'react';

export type FieldContextProps = {
    id: string;
    hasDescription?: boolean;
    hasError?: boolean;
};

export const fieldContext = createContext<
    (FieldContextProps & { setField: (props: Partial<FieldContextProps>) => void }) | null
>(null);

export function useFieldContext(idDefault?: string): Partial<FieldContextProps> & {
    setField: (props: Partial<FieldContextProps>) => void;
    ariaDescribedBy?: string;
    ariaErrorMessage?: string;
} {
    const context = useContext(fieldContext);

    useEffect(() => {
        if (context && idDefault && context.id !== idDefault) context.setField({ id: idDefault });
    }, [idDefault, context]);

    if (!context) {
        return {
            setField: () => {},
        };
    }

    return {
        ariaDescribedBy: context.hasDescription ? `${context.id}-description` : undefined,
        ariaErrorMessage: context.hasError ? `${context.id}-error` : undefined,
        ...context,
    };
}
