import { TabOption, TabList, TabListProps } from '-/components/TabList';
import { useOptionIconsInvalid } from '-/hooks/useOptionIconsInvalid';
import { ElementProps } from '-/types/common';

import './segmented-control.scss';

export type SegmentedControlOption = Pick<TabOption, 'disabled' | 'icon' | 'iconSelected' | 'label' | 'value'>;

export type SegmentedControlProps = TabListProps<SegmentedControlOption>;

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
 * @phase UXReview
 */
function SegmentedControl({
    onChange,
    value,
    size = 'medium',
    options: optionsProp,
    width = 'hug',
    iconsOnly: iconsOnlyProp = false,
    ...containerProps
}: ElementProps<SegmentedControlProps, 'ul'>) {
    const options = Array.isArray(optionsProp) ? optionsProp : [];
    useOptionIconsInvalid(options);

    // If all options have icons, we can hide the labels
    const iconsOnly = iconsOnlyProp === true && options.every((item) => item.icon && item.label);

    return (
        <TabList
            {...containerProps}
            data-bspk="segmented-control"
            iconsOnly={iconsOnly}
            onChange={onChange}
            options={options}
            size={size}
            value={value}
            width={width}
        />
    );
}

SegmentedControl.bspkName = 'SegmentedControl';

export { SegmentedControl };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
