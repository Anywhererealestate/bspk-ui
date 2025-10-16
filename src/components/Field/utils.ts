import { createContext, useContext, useEffect } from 'react';
import { CommonProps } from '-/types/common';
import { randomString } from '-/utils/random';

export type FieldControlProp = CommonProps<'disabled' | 'id' | 'invalid' | 'readOnly' | 'required'>;

/** The props that are provided via context to all Field subcomponents. */
export type FieldContextProps = FieldControlProp & {
    /** The aria-describedby attribute value that should be applied to the field input element. */
    ariaDescribedBy?: string;
    /** The aria-errormessage attribute value that should be applied to the field input element. */
    ariaErrorMessage?: string;
    /** Text that appears after the label, but before the input (e.g. "optional"). */
    labelTrailing?: string;
};

export const fieldContext = createContext<
    (FieldContextProps & { setField: (props: FieldContextProps) => void }) | null
>(null);

export function useFieldContext(): FieldContextProps & {
    setField: (props: FieldContextProps) => void;
} {
    return (
        useContext(fieldContext) || {
            id: undefined as unknown as string,
            setField: () => {},
        }
    );
}

export function useFieldInit(defaults?: FieldContextProps): FieldContextProps & {
    setField: (props: FieldContextProps) => void;
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
