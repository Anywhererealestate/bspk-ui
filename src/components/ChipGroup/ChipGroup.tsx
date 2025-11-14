import './chip-group.scss';

import { Chip, ChipProps } from '-/components/Chip';

export type ChipGroupProps = {
    /**
     * To allow chips to wrap. If set to false chips will scroll.
     *
     * @default true
     */
    wrap?: boolean;
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
 *         wrap={false}
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
export function ChipGroup({ wrap = true, items }: ChipGroupProps) {
    return (
        <div data-bspk="chip-group" data-scroll={wrap === false ? true : undefined}>
            {items?.length ? items.map((item, idx) => <Chip {...item} key={item.label ?? idx} />) : null}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
