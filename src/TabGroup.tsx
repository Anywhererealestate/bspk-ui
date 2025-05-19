import './tab-group.scss';
import { ReactNode } from 'react';

import { Badge } from './Badge';
import { useNavOptions } from './hooks/useNavOptions';

import { ElementProps } from './';

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
    /** The value of the tab. If not provided, the label will be used as the value. */
    value?: string;
    /** The icon to display on the left side of the tab. */
    icon?: ReactNode;
    /** The icon to display on the left side of the tab when the tab is active. */
    iconActive?: ReactNode;
    /** The badge count to display on the tab. */
    badge?: number;
};

export type TabGroupProps = {
    /**
     * The tabs to display. Each tab has a label and an optional leading icon.
     *
     * @type TabGroupOption[]
     * @required
     */
    options: TabGroupOption[];
    /** The id of the selected tab. */
    value?: TabGroupOption['value'];
    /**
     * The function to call when the tab is clicked.
     *
     * @required
     */
    onChange: (tabId: TabGroupOption['value']) => void;
    /**
     * The size of the tabs.
     *
     * @default medium
     */
    size?: 'large' | 'medium' | 'small';
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
 * @name TabGroup
 */
function TabGroup({
    //
    onChange: onTabChange,
    value,
    size = 'medium',
    options,
    width = 'hug',
    showTrail = false,
    ...containerProps
}: ElementProps<TabGroupProps, 'div'>) {
    const items = useNavOptions(options);

    return (
        <div
            {...containerProps}
            data-bspk="tab-group"
            data-hide-trail={(width === 'hug' && !showTrail) || undefined}
            data-size={size}
            data-width={width}
        >
            {items.map((item) => {
                const isActive = item.value === value;

                return (
                    <button
                        data-active={isActive || undefined}
                        disabled={item.disabled || undefined}
                        key={item.value}
                        onClick={() => onTabChange(item.value)}
                    >
                        <span>
                            {(isActive && item.iconActive) || item.icon}
                            {item.label}
                            {item.badge && <Badge count={item.badge} size="x-small" />}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

TabGroup.bspkName = 'TabGroup';

export { TabGroup };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
