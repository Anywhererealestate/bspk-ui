import './segmented-control.scss';
import { Fragment } from 'react';

import { Tooltip } from './Tooltip';
import { useNavOptions } from './hooks/useNavOptions';

import { ElementProps } from './';

export type SegmentedToggleOption = {
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

export type SegmentedControlProps = {
    /**
     * The options to display. Each option has a label and an optional leading icon.
     *
     * @type SegmentedToggleOption[]
     * @required
     */
    options: SegmentedToggleOption[];
    /** The id of the selected option. */
    value?: SegmentedToggleOption['value'];
    /**
     * The function to call when the option is clicked.
     *
     * @required
     */
    onChange: (value: SegmentedToggleOption['value']) => void;
    /**
     * The size of the options.
     *
     * @default medium
     */
    size?: 'medium' | 'small';
    /**
     * The width of the options. If set to 'fill', the options will fill the width of the container. If set to 'hug',
     * the options will be as wide as their content.
     *
     * @default hug
     */
    width?: 'fill' | 'hug';
    /**
     * Determines if the labels of the options should be displayed. If icons are not provided for every option this is
     * ignored and labels are shown.
     *
     * @default true
     */
    showLabels?: boolean;
};

/**
 * Navigation tool that organizes content across different screens and views.
 *
 * @name SegmentedControl
 */
function SegmentedControl({
    onChange,
    value,
    size = 'medium',
    options,
    width = 'hug',
    showLabels: showLabelsProp = true,
    ...containerProps
}: ElementProps<SegmentedControlProps, 'div'>) {
    const items = useNavOptions(options);

    const hideLabels = showLabelsProp === false && items.every((item) => item.icon && item.label);

    return (
        <div {...containerProps} data-bspk="segmented-control" data-size={size} data-width={width}>
            {items.map((item, index) => {
                const isActive = item.value === value;
                return (
                    <Fragment key={item.value}>
                        <Tooltip disabled={!hideLabels} label={item.label} placement="top">
                            <button
                                aria-label={item.label}
                                data-first={index === 0 || undefined}
                                data-last={index === items.length - 1 || undefined}
                                data-selected={isActive || undefined}
                                disabled={item.disabled || undefined}
                                onClick={() => onChange(item.value)}
                            >
                                <span data-outer>
                                    <span data-inner>
                                        {(isActive && item.iconActive) || item.icon}
                                        {!hideLabels && item.label}
                                    </span>
                                </span>
                            </button>
                        </Tooltip>
                    </Fragment>
                );
            })}
        </div>
    );
}

SegmentedControl.bspkName = 'SegmentedControl';

export { SegmentedControl };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
