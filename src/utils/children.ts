import { Children, Fragment, isValidElement, ReactNode } from 'react';

export function isValidIcon(child: unknown) {
    return isChildNamed(child, 'Icon');
}

export function getChildName(child: unknown): string {
    if (!child) return '';

    const typeChild = typeof child;
    if (['string', 'number', 'boolean', 'bigint'].includes(typeChild)) return typeChild;
    return (isValidElement(child) ? (child.type as { bspkName?: string })?.bspkName : '') || '';
}

export function getChildTypeName(child: unknown): string {
    if (!child) return '';
    const typeChild = typeof child;

    if (['string', 'number', 'boolean', 'bigint'].includes(typeChild)) return typeChild;

    if (isValidElement(child)) {
        if (typeof child.type === 'string') return child.type;
        return child.type.name || '';
    }

    return '';
}

export function isChildNamed(child: unknown, name: string): boolean {
    return getChildName(child) === name;
}

export function isReactFragment(node: unknown): node is ReactNode {
    return isValidElement(node) && node.type === Fragment;
}

/**
 * Convert children to a flat array of children elements, removing any fragment wrappers in the process.
 *
 * @param children The children to convert to an array.
 * @param ignoreParent If true, ignore parent elements and only return the children
 */
export function childrenToArray(children: ReactNode): ReactNode[] {
    return Children.toArray(children).flatMap((child) => {
        if (isValidElement(child)) {
            if (isReactFragment(child) && child.props.children) return childrenToArray(child.props.children);
            return child;
        }
        if (Array.isArray(child)) return childrenToArray(child);
        if (child !== null && child !== undefined) return child;
        return [];
    }, []);
}

export type ChildElement =
    | {
          child: ReactNode;
          name: string;
      }
    | {
          child: string;
          name: string;
      };

/**
 * Get the children of a component as an array of objects with the child and the name of the child.
 *
 * Filter out unknown empty strings or non-truthy children other than zeros.
 *
 * @param children The children to get the elements from.
 */
export function getChildrenElements(children: ReactNode): ChildElement[] {
    return (Array.isArray(children) ? children : childrenToArray(children))
        .filter((child) => {
            return (typeof child === 'string' && child.trim() !== '') || child === 0 || child;
        })
        .map((child) => ({ child, name: getChildName(child) }));
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
