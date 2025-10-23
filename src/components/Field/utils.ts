import { createContext, useContext, useEffect } from 'react';
import { CommonProps } from '-/types/common';

export const errorMessageId = (id: string) => `${id}-field-error`;
export const labelledById = (id: string) => `${id}-label`;
export const describedById = (id: string) => `${id}-description`;

/** The props that are provided via context to all Field subcomponents. */
export type FieldContextProps = CommonProps<'required'> & {
    /** The aria-describedby attribute value that should be applied to the field input element. */
    ariaDescribedBy?: string;
    /** The aria-errormessage attribute value that should be applied to the field input element. */
    ariaErrorMessage?: string;
    /** Text that appears after the label, but before the input (e.g. "optional"). */
    labelTrailing?: string;
    /** The aria-labelledby attribute value that should be applied to the field input element. */
    ariaLabelledBy?: string;
    /** The htmlFor attribute value that should be applied to the field label element. */
    htmlFor?: string;
    /** The id of the field. */
    id: string;
};

export type FieldContext = FieldContextProps & {
    setContext: (next: Pick<FieldContextProps, 'htmlFor' | 'required'>) => void;
};

export const fieldContext = createContext<FieldContext | null>(null);

export function useFieldContext(): FieldContext {
    return (
        useContext(fieldContext) || {
            id: undefined as unknown as string,
            setContext: () => {},
        }
    );
}

export function useFieldInit({ htmlFor, required }: { htmlFor: string; required?: boolean }): FieldContext {
    const context = useContext(fieldContext);

    useEffect(() => {
        if (!context) return;
        if (htmlFor !== context?.htmlFor || required !== context?.required) context.setContext({ htmlFor, required });
    }, [context, htmlFor, required]);

    if (!context) {
        return {
            htmlFor,
            id: ``,
            setContext: () => {},
        };
    }

    // consider field invalid if there is an error message
    return context;
}
