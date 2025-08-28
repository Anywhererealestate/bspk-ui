import { TabList, TabListProps, TabOption } from '-/components/TabList';

import './tab-group.scss';

export type TabGroupSize = 'large' | 'medium' | 'small';

export type TabGroupProps = Omit<TabListProps<TabOption>, 'data-bspk' | 'iconsOnly'> & {
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
export function TabGroup({
    onChange,
    value,
    size = 'medium',
    options,
    width = 'hug',
    showTrail = false,
    label,
    elementAttributes,
    id,
    style,
}: TabGroupProps) {
    if (!Array.isArray(options) || options.length < 2) return <></>;
    return (
        <TabList
            data-bspk="tab-group"
            elementAttributes={{ ...elementAttributes, 'data-show-trail': showTrail || undefined }}
            id={id}
            label={label}
            onChange={onChange}
            options={options}
            size={size}
            style={style}
            value={value}
            width={width}
        />
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
