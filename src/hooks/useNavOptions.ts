import { useMemo } from 'react';

import { getChildTypeName, isValidIcon } from '../utils/children';
import { useErrorLogger } from '../utils/errors';

/**
 * A utility hook used within navigation components. Returns options ready for use in a navigation component. Validates
 * the icons and sets the icon and iconActive properties.
 *
 * @param options [NavOption[]] The options to display. Each option has a label and an optional leading icon.
 * @returns {undefined} NavOption[] The options with the validated icon and iconActive properties set.
 */
export function useNavOptions<T extends NavOption>(options: T[] | undefined): T[] {
    const { logError } = useErrorLogger();

    return useMemo(() => {
        if (!options) return [];

        const iconsInvalid = options.some((o) => o.icon) ? !options.every((option) => isValidIcon(option.icon)) : null;

        logError(
            iconsInvalid === true,
            'useNavOptions - Every option either must have a valid icon or none at all. All icons removed.',
        );

        return options
            .map((option) => {
                let { icon, iconActive } = option;

                if (iconsInvalid) {
                    icon = undefined;
                    iconActive = undefined;
                }

                if (
                    iconActive &&
                    // If the iconActive is not a valid icon or the iconActive is not a fill version of the icon, remove the iconActive
                    (!icon ||
                        !isValidIcon(iconActive) ||
                        getChildTypeName(iconActive) !== `${getChildTypeName(icon)}Fill`)
                ) {
                    iconActive = undefined;
                }

                return {
                    ...option,
                    value: option.value || option.label,
                    icon,
                    iconActive,
                };
            })
            .map((tab, _, arr) => ({ ...tab, icon: arr.every((t) => t.icon) ? tab.icon : undefined }));
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
