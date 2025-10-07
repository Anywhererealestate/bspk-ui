/** A safe way to get an element by ID that works in SSR environments or when the ID value is not considered valid. */
export function getElementById<T extends HTMLElement = HTMLElement>(id?: string | null): T | null {
    if (typeof document === 'undefined') return null;
    if (!id) return null;
    return document.querySelector<T>(`[id="${id}"]`);
}
