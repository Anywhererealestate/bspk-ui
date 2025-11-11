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
 *     import { Chip } from '@bspk/ui/Chip';
 *     import { ChipGroup } from '@bspk/ui/ChipGroup';
 *
 *     <ChipGroup wrap={false}>
 *         <Chip
 *             label="chip 1"
 *             leadingIcon={<SvgLightbulb />}
 *             onClick={() => action('Chip clicked!')}
 *             trailingIcon={<SvgChevronRight />}
 *         />
 *         <Chip
 *             label="chip 2"
 *             leadingIcon={<SvgIcecream />}
 *             onClick={() => action('Chip clicked!')}
 *             trailingIcon={<SvgChevronRight />}
 *         />
 *         <Chip
 *             label="chip 3"
 *             leadingIcon={<SvgSignLanguage />}
 *             onClick={() => action('Chip clicked!')}
 *             trailingIcon={<SvgClose />}
 *         />
 *     </ChipGroup>;
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
