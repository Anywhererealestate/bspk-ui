import { MutableRefObject, RefCallback } from 'react';

export type InnerRef<T extends HTMLElement | null> = MutableRefObject<T> | RefCallback<T>;

/** Sets a ref using either a ref callback or a ref object */
export function setRef<T extends HTMLElement | null>(ref: InnerRef<T>, node: T): void {
    if (typeof ref === 'function') return ref(node);
    ref.current = node;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
