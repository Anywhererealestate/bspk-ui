import './chip-group.scss';

import { ReactNode } from 'react';

import { ChipProps } from '-/components/Chip';

export type ChipGroupItem = Pick<
    ChipProps,
    'disabled' | 'flat' | 'label' | 'leadingIcon' | 'onClick' | 'selected' | 'trailingBadge' | 'trailingIcon'
>;

export type ChipGroupProps = {
    /**
     * To allow chips to wrap. If set to false chips will scroll.
     *
     * @default true
     */
    wrap?: boolean;
    /** Only Chip components should be used as children. */
    children?: ReactNode;
};
/**
 * A component that manages the layout of a group of chips.
 *
 * @example
 *     import { ChipGroup } from '@bspk/ui/ChipGroup';
 *     import { Chip } from '@bspk/ui/Chip';
 *
 *     function Example() {
 *         return (
 *             <ChipGroup wrap={false}>
 *                 <Chip label="chip 1" onClick={() => console.log('Chip 1')} />
 *                 <Chip label="chip 2" onClick={() => console.log('Chip 2')} />
 *                 <Chip label="chip 3" onClick={() => console.log('Chip 3')} />
 *             </ChipGroup>
 *         );
 *     }
 *
 * @name ChipGroup
 * @phase UXReview
 */
export function ChipGroup({ children, wrap = true }: ChipGroupProps) {
    return (
        <div data-bspk="chip-group" data-wrap={wrap || undefined}>
            {children}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
