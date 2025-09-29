import './bottom-navigation.scss';
import { TabList, TabListProps } from '-/components/TabList';

export type BottomNavigationProps = Pick<TabListProps, 'label' | 'onChange' | 'options' | 'value'> & {
    /**
     * Determines how the BottomNavigation will appear.
     *
     * @default flat
     */
    variant?: 'elevated' | 'flat';
};

/**
 * A bottom bar displaying three to five top level destinations at the bottom of screen for a mobile application.
 *
 * @example
 *     import { BottomNavigation } from '@bspk/ui/BottomNavigation';
 *     import { useState } from 'react';
 *
 *     function Example() {
 *         const [value, setValue] = useState<string>('1');
 *
 *         return (
 *             <BottomNavigation
 *                 value={value}
 *                 onChange={onChange}
 *                 options={[
 *                     {
 *                         value: '1',
 *                         label: 'Item 1',
 *                         icon: <SvgSettings />,
 *                         iconSelected: <SvgSettingsFill />,
 *                     },
 *                     {
 *                         value: '2',
 *                         label: 'Item 2',
 *                         icon: <SvgCloud />,
 *                         iconSelected: <SvgCloudFill />,
 *                     },
 *                 ]}
 *             />
 *         );
 *     }
 *
 * @name BottomNavigation
 * @phase Dev
 */
export function BottomNavigation({ variant = 'flat', ...tabListProps }: BottomNavigationProps) {
    return <TabList data-bspk="bottom-navigation" data-variant={variant} size="large" {...tabListProps} />;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
