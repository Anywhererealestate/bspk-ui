import { TabList, TabListProps, TabOption } from '-/components/TabList';
import { useOptionIconsInvalid } from '-/hooks/useOptionIconsInvalid';
import { ElementProps } from '-/types/common';

import './tab-group.scss';

export type TabGroupSize = 'large' | 'medium' | 'small';

export type TabGroupProps = Omit<TabListProps<TabOption>, 'iconsOnly'> & {
    /**
     * When width is 'hug' this determines if the trailing underline should be showing. When width is 'fill' this
     * property isn't applicable.
     *
     * @default false
     */
    showTrail?: boolean;
};

/**
 * Navigation tool that organizes content across different screens and views.
 *
 * @example
 *     import { useState } from 'react';
 *     import { TabGroup } from '@bspk/ui/TabGroup';
 *
 *     export function Example() {
 *         const [selectedTab, setSelectedTab] = useState<string>();
 *
 *         return (
 *             <TabGroup
 *                 onChange={setSelectedTab}
 *                 options={[
 *                     { value: '1', label: 'Option 1' },
 *                     { value: '2', label: 'Option 2' },
 *                     { value: '3', label: 'Option 3' },
 *                 ]}
 *                 value={selectedTab}
 *             />
 *         );
 *     }
 *
 * @name TabGroup
 * @phase UXReview
 */
function TabGroup({
    onChange: onTabChange,
    value,
    size = 'medium',
    options: optionsProp,
    width = 'hug',
    showTrail = false,
    ...containerProps
}: ElementProps<TabGroupProps, 'ul'>) {
    const options = Array.isArray(optionsProp) ? optionsProp : [];
    useOptionIconsInvalid(options);

    if (options.length < 2) return <></>;

    return (
        <TabList
            data-bspk="tab-group"
            data-show-trail={showTrail || undefined}
            onChange={onTabChange}
            options={options}
            size={size}
            value={value}
            width={width}
            {...containerProps}
        />
    );
}

TabGroup.bspkName = 'TabGroup';

export { TabGroup };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
