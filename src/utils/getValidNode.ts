import { isValidElement } from 'react';

export function getValidNode<T = unknown>(node: T): T | undefined {
    return isValidElement(node) || typeof node === 'string' || typeof node === 'number' ? node : undefined;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
