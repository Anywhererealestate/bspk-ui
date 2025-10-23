import { createContext, useContext, useEffect } from 'react';

export const errorMessageId = (id: string) => `${id}-field-error`;
export const labelledById = (id: string) => `${id}-label`;
export const describedById = (id: string) => `${id}-description`;

/**
 * The props that are provided via context to all Field subcomponents.
 *
 * `disabled`, `readOnly`, `required`, `labelTrailing`, and `id` are one-way props that are intended to be set by the
 * control component using the useFieldInit hook.
 *
 * `ariaDescribedBy`, `ariaErrorMessage` are two-way props that can be set by both the control component and Field
 * subcomponents.
 *
 * When FieldError sets `ariaErrorMessage`, it sets the context `invalid` as true.
 *
 * When FieldLabel sets `labelTrailing`, it adds content to appear after the label.
 *
 * Intended to be set by the control component (e.g., Input, Textarea) via the useFieldInit hook.
 */
export type FieldContextProps = {
    id: string;
    /**
     * Text that appears after the label, but before the input (e.g. "optional").
     *
     * Intended to be set by the control component (e.g., Input, Textarea) via the useFieldInit hook and read by
     * FieldLabel.
     */
    labelTrailing?: string;
    /**
     * Whether the field is required.
     *
     * Intended to be set by the control component (e.g., Input, Textarea) via the useFieldInit hook and read by
     * FieldLabel.
     */
    required?: boolean;
    /** The id of the control description. */
    ariaDescribedBy?: string;
    /** The id of the error message */
    ariaErrorMessage?: string;
    /** The id of the label element. */
    ariaLabelledBy?: string;
};

export type FieldContext = FieldContextProps & {
    setContext: (updates: Partial<FieldContext>) => void;
};

export const fieldContext = createContext<FieldContext | null>(null);

export function useFieldContext(): FieldContext {
    return (
        useContext(fieldContext) || {
            id: '',
            setContext: () => {},
        }
    );
}
/**
 * This hook initializes field context values for control components that are children of a Field component.
 *
 * @param defaults - Default values to initialize the field context with.
 * @returns {{
 *     id: string; - The unique id for the field. Generated if not provided.
 *     invalid: boolean; - Whether the field is in an invalid state based on defaults and whether there is an error message.
 *     ariaDescribedBy?: string; - The aria-describedby attribute value to apply to the control component.
 *     ariaErrorMessage?: string; - The aria-errormessage attribute value to apply to the control component.
 * }}
 *   The initialized field context values.
 */
export function useFieldInit(defaults?: Pick<FieldContext, 'labelTrailing' | 'required'>): FieldContext {
    const context = useContext(fieldContext);

    useEffect(() => {
        if (!context || !defaults) return;

        const updates: Partial<FieldContext>[] = [];

        if (defaults.required && !!context.required !== !!defaults.required) {
            updates.push({ required: defaults.required });
        }

        if (defaults.labelTrailing && context.labelTrailing !== defaults.labelTrailing) {
            updates.push({ labelTrailing: defaults.labelTrailing });
        }

        if (updates.length > 0) context.setContext(Object.assign({}, ...updates));
    }, [defaults, context]);

    if (!context) {
        return { ...defaults, id: '', setContext: () => {} };
    }

    // consider field invalid if there is an error message
    return context;
}
