export const errorMessageId = (id: string) => `${id}-field-error`;
export const labelledById = (id: string) => `${id}-label`;
export const describedById = (id: string) => `${id}-description`;
export function propsWithAria<T extends Record<string, unknown>>({
    errorMessage,
    helperText,
    controlProps,
    id,
}: {
    errorMessage?: string;
    helperText?: string;
    controlProps: T;
    id: string;
}) {
    return {
        ...controlProps,
        id,
        'aria-errormessage': errorMessage ? errorMessageId(id) : undefined,
        'aria-describedby': helperText ? describedById(id) : undefined,
        'aria-invalid': errorMessage ? true : undefined,
    };
}
