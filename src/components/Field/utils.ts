import { createContext, useContext, useEffect, useMemo } from 'react';
import { useId } from '-/hooks/useId';
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

/**
 * Initializes field-related attributes and state for a form control component.
 *
 * Creates id if not provided, manages invalid state, and syncs with Field context.
 */
export function useFieldInit({
    idProp,
    required,
    disabled,
    readOnly,
    invalidProp,
}: {
    idProp: string | undefined;
    required: boolean | undefined;
    disabled: boolean | undefined;
    readOnly?: boolean | undefined;
    invalidProp: boolean | undefined;
}): Pick<FieldContext, 'ariaDescribedBy' | 'ariaErrorMessage'> & { invalid: boolean; id: string } {
    const context = useContext(fieldContext);
    const controlId = useId(idProp || context?.htmlFor);

    const invalid = useMemo(
        () => !disabled && !readOnly && (invalidProp || !!context?.ariaErrorMessage),
        [disabled, readOnly, invalidProp, context?.ariaErrorMessage],
    );

    useEffect(() => {
        if (!context) return;

        if (controlId !== context?.htmlFor || !!required !== !!context?.required) {
            context.setContext({ htmlFor: controlId, required: required });
        }
    }, [context, controlId, required]);

    return {
        ...(context || {}),
        invalid,
        id: controlId,
    };
}
