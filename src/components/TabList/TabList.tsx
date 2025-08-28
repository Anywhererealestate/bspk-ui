import { Fragment, ReactNode, useMemo } from 'react';

import { Badge, BadgeProps } from '-/components/Badge';
import { Tooltip } from '-/components/Tooltip';
import { Truncated } from '-/components/Truncated';
import { useId } from '-/hooks/useId';
import { useKeyNavigation } from '-/hooks/useKeyNavigation';
import { CommonProps, ElementAttributes } from '-/types/common';

import './tab-list.scss';

const TAB_BADGE_SIZES: Record<TabSize, BadgeProps['size']> = {
    large: 'small',
    medium: 'x-small',
    small: 'x-small',
};

export type TabSize = 'large' | 'medium' | 'small';

export type TabOption = {
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
    value: string;
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

const optionId = (id: string, index: number) => `${id}-item-${index + 1}`;

export type TabListProps<O extends TabOption = TabOption> = ElementAttributes<
    'ul',
    CommonProps<'style'> & {
        /**
         * The tabs to display.
         *
         * If **less than 2** items are provided, the component will not render.
         *
         * @example
         *     [
         *         { value: '1', label: 'Option 1' },
         *         { value: '2', label: 'Disabled 2 ', disabled: true },
         *         { value: '3', label: 'Option 3' },
         *     ];
         *
         * @type Array<TabOption>
         * @required
         */
        options: O[];
        /**
         * The value of the selected tab.
         *
         * @example
         *     1;
         *
         * @required
         */
        value: TabOption['value'];
        /**
         * The function to call when the tab is clicked.
         *
         * @required
         */
        onChange: (tabValue: string) => void;
        /**
         * The size of the tabs.
         *
         * @default medium
         */
        size?: TabSize;
        /**
         * When 'fill' the options will fill the width of the container. When 'hug', the options will be as wide as
         * their content.
         *
         * @default hug
         */
        width?: 'fill' | 'hug';
        /**
         * The label for the tab utility, used for accessibility.
         *
         * @required
         */
        label: string;
        /** The id of the tab utility, used for accessibility. */
        id?: string;
        /**
         * Determines if the labels of the options should be displayed. If icons are not provided for every option this
         * is ignored and labels are shown.
         *
         * @default false
         */
        iconsOnly?: boolean;
    }
>;

/**
 * Navigation tool that organizes content across different screens and views.
 *
 * See TabGroup or SegmentedControl for examples.
 *
 * @example
 *     import { useState } from 'react';
 *     import { TabList } from '@bspk/ui/TabList';
 *
 *     export function Example() {
 *         const [selectedTab, setSelectedTab] = useState<string>();
 *
 *         return (
 *             <TabList
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
 * @name TabList
 * @phase Utility
 */
export function TabList({
    //
    onChange,
    value: valueProp,
    size = 'medium',
    options: optionsProp,
    width = 'hug',
    label,
    id: idProp,
    iconsOnly: iconsOnlyProp = false,
    attr,
    style,
}: TabListProps) {
    const id = useId(idProp);
    const options = useMemo(() => {
        if (!Array.isArray(optionsProp)) return [];
        return optionsProp.map((opt, index) => ({ ...opt, id: optionId(id, index) }));
    }, [id, optionsProp]);

    const value = useMemo(() => {
        const option = options.find((opt) => opt.value === valueProp);
        return option ? option.value : options[0]?.value;
    }, [options, valueProp]);

    const { handleKeyDown, activeElementId, setElements, setActiveElementId } = useKeyNavigation({
        onSelect: (nextActiveId) => {
            onChange(options.find((opt) => opt.id === nextActiveId)?.value || '');
        },
    });

    // If all options have icons, we can hide the labels
    const iconsOnly = iconsOnlyProp === true && options.every((item) => item.icon && item.label);

    const handleClick = (item: (typeof options)[number]) => (e: React.MouseEvent<HTMLLIElement>) => {
        setTimeout(() => (e.target as HTMLElement).focus(), 100);
        setActiveElementId(item.id);
        if (!item.disabled) onChange(item.value);
    };

    return (
        <ul
            {...attr}
            aria-label={label}
            data-bspk-utility="tab-list"
            data-hug={width === 'hug' || undefined}
            data-size={size}
            data-width={width}
            id={id}
            ref={(node) => {
                if (node) {
                    const newElements = (Array.from(node.children) as HTMLElement[]).filter(
                        (el) => !el.hasAttribute('aria-disabled'),
                    );
                    setElements(newElements);
                }
            }}
            role="tablist"
            style={style}
        >
            {options.map((item) => {
                const isSelected = item.value === value;
                const icon = isSelected ? item.iconSelected : item.icon;
                return (
                    <Fragment key={item.id}>
                        <Tooltip disabled={!iconsOnly} label={item.label} placement="top">
                            {(triggerProps) => (
                                <li
                                    aria-controls={id}
                                    aria-disabled={item.disabled || undefined}
                                    aria-selected={isSelected || undefined}
                                    data-active={activeElementId === item.id || undefined}
                                    data-value={item.value}
                                    id={item.id}
                                    onClick={handleClick(item)}
                                    onKeyDown={handleKeyDown}
                                    role="tab"
                                    tabIndex={isSelected ? 0 : -1}
                                    {...triggerProps}
                                >
                                    {icon && <span aria-hidden="true">{icon}</span>}
                                    {!iconsOnly && <Truncated data-label>{item.label}</Truncated>}
                                    {item.badge && !item.disabled && (
                                        <Badge count={item.badge} size={TAB_BADGE_SIZES[size]} />
                                    )}
                                </li>
                            )}
                        </Tooltip>
                    </Fragment>
                );
            })}
        </ul>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
