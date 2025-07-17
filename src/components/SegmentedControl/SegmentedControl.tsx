import { Fragment } from 'react';

import { Tooltip } from '-/components/Tooltip';
import { useOptionIconsInvalid } from '-/hooks/useOptionIconsInvalid';
import { ElementProps } from '-/types/common';

import './segmented-control.scss';

export type SegmentedControlOption = {
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
    /**
     * The the icon to display before the label.
     *
     * @type BspkIcon
     */
    icon?: React.ReactNode;
    /**
     * The icon to display before the label when the option is active.
     *
     * @type BspkIcon
     */
    iconActive?: React.ReactNode;
};

export type SegmentedControlProps = {
    /**
     * The options to display. Each option has a label and an optional leading icon.
     *
     * @example
     *     [
     *         { value: '1', label: 'Option 1' },
     *         { value: '2', label: 'Option 2' },
     *         { value: '3', label: 'Option 3' },
     *     ];
     *
     * @type Array<SegmentedControlOption>
     * @required
     */
    options: SegmentedControlOption[];
    /**
     * The id of the selected option.
     *
     * @example
     *     1;
     *
     * @required
     */
    value: SegmentedControlOption['value'];
    /**
     * The function to call when the option is clicked.
     *
     * @required
     */
    onChange: (value: SegmentedControlOption['value']) => void;
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
 * @example
 *     import { useState } from 'react';
 *     import { SegmentedControl } from '@bspk/ui/SegmentedControl';
 *
 *     export function Example() {
 *         const [selectedOption, setSelectedOption] = useState<string>();
 *
 *         return (
 *             <SegmentedControl
 *                 onChange={setSelectedOption}
 *                 options={[
 *                     { value: '1', label: 'Option 1' },
 *                     { value: '2', label: 'Option 2' },
 *                     { value: '3', label: 'Option 3' },
 *                 ]}
 *                 value={selectedOption}
 *             />
 *         );
 *     }
 *
 * @name SegmentedControl
 * @phase DesignReview
 */
function SegmentedControl({
    onChange,
    value,
    size = 'medium',
    options: optionsProp,
    width = 'hug',
    showLabels: showLabelsProp = true,
    ...containerProps
}: ElementProps<SegmentedControlProps, 'div'>) {
    const options = Array.isArray(optionsProp) ? optionsProp : [];
    useOptionIconsInvalid(options);

    const hideLabels = showLabelsProp === false && options.every((item) => item.icon && item.label);

    return (
        <div {...containerProps} data-bspk="segmented-control" data-size={size} data-width={width}>
            {options.map((item, index) => {
                const isActive = item.value === value;
                return (
                    <Fragment key={item.value}>
                        <Tooltip disabled={!hideLabels} label={item.label} placement="top">
                            <button
                                aria-label={item.label}
                                data-first={index === 0 || undefined}
                                data-last={index === options.length - 1 || undefined}
                                data-selected={isActive || undefined}
                                disabled={item.disabled || undefined}
                                onClick={() => onChange(item.value || item.label)}
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
