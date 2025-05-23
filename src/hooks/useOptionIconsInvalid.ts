import { useMemo } from 'react';

import { isValidIcon } from '../utils/children';
import { useErrorLogger } from '../utils/errors';

/**
 * A utility hook used within navigation components. Returns true if the icons are invalid.
 *
 * @param options [NavOption[]] The options to display. Each option has an optional leading icon.
 * @returns {boolean} True if the icons are invalid.
 */
export function useOptionIconsInvalid<T extends NavOption>(options: T[] | undefined): boolean {
    const { logError } = useErrorLogger();

    return useMemo(() => {
        if (!options || !Array.isArray(options)) return true;

        const iconsInvalid = options.some((o) => o.icon) && !options.every((option) => isValidIcon(option.icon));

        logError(
            iconsInvalid,
            'useNavOptions - Every option either must have a valid icon or none at all. All icons removed.',
        );

        return iconsInvalid;
    }, [logError, options]);
}

export type NavOption = {
    /**
     * The label of the option. This is the text that will be displayed on the option.
     *
     * @required
     */
    label: string;
    /**
     * Determines if the element is [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled).
     *
     * @default false
     */
    disabled?: boolean;
    /** The value of the option. If not provided, the label will be used as the value. */
    value?: string;
    /** The the icon to display before the label. */
    icon?: React.ReactNode;
    iconActive?: React.ReactNode;
};

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
