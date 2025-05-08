import { ReactNode, useMemo } from 'react';

import { getChildrenElements } from '../utils/children';
import { useErrorLogger } from '../utils/errors';

const VALID_CHILDREN = ['Icon', 'string'];

export function useValidChildren(
    componentNme: string,
    children: ReactNode,
    ariaLabel: string | undefined,
    override?: boolean,
): {
    icon?: ReactNode | undefined;
    label?: ReactNode | undefined;
} {
    const { logError } = useErrorLogger();

    return useMemo(() => {
        if (override) return { icon: undefined, label: undefined };

        let icon: ReactNode | undefined;
        let label: ReactNode;

        const childrenArray = getChildrenElements(children);

        logError(
            childrenArray.length > 2,
            `${componentNme} - component only accepts two children, ${childrenArray.length} were provided`,
        );

        childrenArray.forEach(({ child, name }) => {
            const valid = VALID_CHILDREN.includes(name);

            logError(!valid, `${componentNme} -  component only accepts two children, and Icon and string`);

            if (valid) {
                if (name === 'string') label = child;
                if (name === 'Icon') icon = child;
            }
        });

        logError(!icon && !label, `${componentNme} - component requires at least one child, an icon or a label`);

        logError(
            !!icon && !label && !ariaLabel,
            `${componentNme} - component requires the aria-label property when only an icon is provided`,
        );

        return { icon, label };
    }, [override, children, logError, componentNme, ariaLabel]);
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
