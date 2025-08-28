import { TabOption, TabList, TabListProps } from '-/components/TabList';

import './segmented-control.scss';

export type SegmentedControlOption = Pick<TabOption, 'disabled' | 'icon' | 'iconSelected' | 'label' | 'value'>;

export type SegmentedControlProps = Omit<TabListProps<SegmentedControlOption>, 'data-bspk'>;

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
export function SegmentedControl({
    onChange,
    value,
    size = 'medium',
    options,
    width = 'hug',
    iconsOnly,
    label,
    elementAttributes,
    id,
    style,
}: SegmentedControlProps) {
    return (
        <TabList
            data-bspk="segmented-control"
            elementAttributes={elementAttributes}
            iconsOnly={iconsOnly}
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
