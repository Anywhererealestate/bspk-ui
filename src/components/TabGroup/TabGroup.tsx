import { ReactNode } from 'react';

import { Badge, BadgeProps } from '-/components/Badge';
import { useOptionIconsInvalid } from '-/hooks/useOptionIconsInvalid';
import { ElementProps } from '-/types/common';

import './tab-group.scss';

export type TabGroupSize = 'large' | 'medium' | 'small';

const TAB_BADGE_SIZES: Record<TabGroupSize, BadgeProps['size']> = {
    large: 'small',
    medium: 'x-small',
    small: 'x-small',
};

export type TabGroupOption = {
    /**
     * The label of the tab. This is the text that will be displayed on the tab.
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
    /**
     * The value of the tab sent to onChange when selected.
     *
     * If not provided, the label will be used as the value.
     */
    value?: string;
    /**
     * The icon to display on the left side of the tab.
     *
     * @type BspkIcon
     */
    icon?: ReactNode;
    /**
     * The icon to display on the left side of the tab when the tab is currently selected.
     *
     * @type BspkIcon
     */
    iconSelected?: ReactNode;
    /** The badge count to display on the tab */
    badge?: number;
};

export type TabGroupProps = {
    /**
     * The tabs to display. Each tab has a label and an optional leading icon.
     *
     * Minimum of two tab options are required. Maximum of seven tab options are ideal.
     *
     * @example
     *     [
     *         { value: '1', label: 'Option 1' },
     *         { value: '2', label: 'Disabled 2 ', disabled: true },
     *         { value: '3', label: 'Option 3' },
     *     ];
     *
     * @type Array<TabGroupOption>
     * @required
     */
    options: TabGroupOption[];
    /**
     * The value of the selected tab.
     *
     * @example
     *     1;
     *
     * @required
     */
    value: TabGroupOption['value'];
    /**
     * The function to call when the tab is clicked.
     *
     * @required
     */
    onChange: (tabValue: string, index: number) => void;
    /**
     * The size of the tabs.
     *
     * @default medium
     */
    size?: TabGroupSize;
    /**
     * When 'fill' the options will fill the width of the container. When 'hug', the options will be as wide as their
     * content.
     *
     * @default hug
     */
    width?: 'fill' | 'hug';
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
    //
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
        <ul
            {...containerProps}
            data-bspk="tab-group"
            data-hide-trail={(width === 'hug' && !showTrail) || undefined}
            data-size={size}
            data-width={width}
            role="tablist"
        >
            {options.map((item, itemIndex) => {
                const isSelected = item.value === value;
                const icon = isSelected ? item.iconSelected : item.icon;
                return (
                    <li
                        aria-disabled={item.disabled || undefined}
                        aria-selected={isSelected || undefined}
                        data-disabled={item.disabled || undefined}
                        data-selected={isSelected || undefined}
                        key={item.value}
                        onClick={() => {
                            if (!item.disabled) {
                                onTabChange(item.value || item.label, itemIndex);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (!item.disabled && (e.key === 'Enter' || e.key === ' ')) {
                                e.preventDefault();
                                onTabChange(item.value || item.label, itemIndex);
                            }
                        }}
                        role="tab"
                        tabIndex={item.disabled ? -1 : 0}
                    >
                        <span>
                            {icon && <span aria-hidden="true">{icon}</span>}
                            {item.label}
                            {item.badge && !item.disabled && <Badge count={item.badge} size={TAB_BADGE_SIZES[size]} />}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}

TabGroup.bspkName = 'TabGroup';

export { TabGroup };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
