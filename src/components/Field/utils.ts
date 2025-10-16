import { createContext, useContext, useEffect } from 'react';
import { randomString } from '-/utils/random';

/** The props that are provided via context to all Field subcomponents. */
export type FieldContextProps = {
    /** The unique identifier for the field. */
    id: string;
    /** The `aria-describedby` attribute value that should be applied to the field input element. */
    ariaDescribedBy?: string;
    /** The `aria-errormessage` attribute value that should be applied to the field input element. */
    ariaErrorMessage?: string;
    /**
     * Whether the field is currently in an invalid state.
     *
     * If FieldError is used within the Field, this will be set true.
     */
    invalid?: boolean;
    /** Whether the field is required. */
    required?: boolean;
    /** Whether the field is read-only. */
    readOnly?: boolean;
    /** Whether the field is disabled. */
    disabled?: boolean;
    /** Text that appears after the label, but before the input (e.g. "optional"). */
    labelTrailing?: string;
};

export const fieldContext = createContext<
    (Partial<FieldContextProps> & { setField: (props: Partial<FieldContextProps>) => void }) | null
>(null);

export function useFieldContext(): Partial<FieldContextProps> & {
    setField: (props: Partial<FieldContextProps>) => void;
} {
    return (
        useContext(fieldContext) || {
            id: undefined as unknown as string,
            setField: () => {},
        }
    );
}

export function useFieldInit(defaults?: Partial<FieldContextProps>): Partial<FieldContextProps> & {
    setField: (props: Partial<FieldContextProps>) => void;
    ariaDescribedBy?: string;
    ariaErrorMessage?: string;
} {
    const context = useContext(fieldContext);

    useEffect(() => {
        if (!context || !context.setField || !defaults) return;

        // prevent duplicate calls
        if (
            Object.keys(defaults).some((key) => {
                // don't reset id defaults.id is falsey
                if (key === 'id') return defaults.id && context.id !== defaults.id;
                return context[key as keyof FieldContextProps] !== defaults[key as keyof FieldContextProps];
            })
        ) {
            context.setField({ ...defaults, id: defaults.id || context.id || `field-${randomString(8)}` });
        }
    }, [context, defaults]);

    if (!context) {
        return {
            ...defaults,
            id: defaults?.id || ``,
            setField: () => {},
        };
    }

    return context;
}
