import { isValidElement } from 'react';

export function isValidIcon(child: unknown) {
    return getChildName(child) === 'Icon';
}

export function getChildName(child: unknown): string {
    if (!child) return '';

    const typeChild = typeof child;
    if (['string', 'number', 'boolean', 'bigint'].includes(typeChild)) return typeChild;
    return (isValidElement(child) ? (child.type as { bspkName?: string })?.bspkName : '') || '';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
