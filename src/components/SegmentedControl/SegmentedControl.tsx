import './segmented-control.scss';
import { TabOption, TabList, TabListProps } from '-/components/TabList';
import { ElementProps } from '-/types/common';

export type SegmentedControlOption = Omit<TabOption, 'badge'>;
export type SegmentedControlProps = TabListProps<SegmentedControlOption>;

/**
 * Navigation tool that organizes content across different screens and views.
 *
 * @example
 *     import { SegmentedControl } from '@bspk/ui/SegmentedControl';
 *
 *     () => {
 *         const [selectedOption, setSelectedOption] = useState<string>('');
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
 *     };
 *
 * @name SegmentedControl
 * @phase Stable
 */
export function SegmentedControl({
    onChange,
    value,
    size = 'medium',
    options,
    width = 'hug',
    iconsOnly,
    ...containerProps
}: ElementProps<SegmentedControlProps, 'ul'>) {
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

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
