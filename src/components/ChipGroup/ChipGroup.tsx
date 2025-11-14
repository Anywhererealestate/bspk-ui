import './chip-group.scss';

import { Chip, ChipProps } from '-/components/Chip';

export type ChipGroupProps = {
    /**
     * Controls the overflow behavior of the chip group. If set to `scroll`, the chip group will be scrollable
     * horizontally. If set to `wrap`, the chip group will wrap to multiple lines as needed.
     *
     * @default wrap
     */
    overflow?: 'scroll' | 'wrap';
    /** Only Chip components should be used as items. */
    items?: ChipProps[];
};
/**
 * A component that manages the layout of a group of chips.
 *
 * @example
 *     import { Chip } from '@bspk/ui/Chip';
 *     import { ChipGroup } from '@bspk/ui/ChipGroup';
 *
 *     <ChipGroup
 *         overflow="scroll"
 *         items={[
 *             { label: 'chip 1', leadingIcon: <SvgLightbulb />, onClick: () => {}, trailingIcon: <SvgChevronRight /> },
 *             { label: 'chip 2', leadingIcon: <SvgIcecream />, onClick: () => {}, trailingIcon: <SvgChevronRight /> },
 *             { label: 'chip 3', leadingIcon: <SvgSignLanguage />, onClick: () => {}, trailingIcon: <SvgClose /> },
 *         ]}
 *     />;
 *
 * @name ChipGroup
 * @phase UXReview
 */
export function ChipGroup({ overflow = 'wrap', items }: ChipGroupProps) {
    return (
        <div data-bspk="chip-group" data-scroll={overflow === 'scroll' || undefined}>
            {items?.length ? items.map((item, idx) => <Chip {...item} key={item.label ?? idx} />) : null}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
