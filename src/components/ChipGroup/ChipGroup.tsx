import './chip-group.scss';

// import { ReactNode } from 'react';
import { Chip, ChipProps } from '-/components/Chip';

export type ChipGroupItem = Pick<
    ChipProps,
    'disabled' | 'flat' | 'label' | 'leadingIcon' | 'onClick' | 'selected' | 'trailingBadge' | 'trailingIcon'
>;

export type ChipGroupProps = {
    /**
     * To allow chips to wrap. If set to false chips will scroll.
     *
     * @default false
     */
    scroll?: boolean;
    /** Only Chip components should be used as items. */
    items?: ChipGroupItem[];
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
export function ChipGroup({ scroll = false, items }: ChipGroupProps) {
    const anyFlatFalse = items?.some((item) => item.flat === false || item.flat === undefined);
    return (
        <div data-bspk="chip-group" data-elevated-chips={anyFlatFalse ? true : null} data-scroll={scroll || undefined}>
            {items?.length
                ? items.map((item, idx) => (
                      <Chip
                          disabled={item.disabled ?? false}
                          flat={item.flat ?? false}
                          key={item.label ?? idx}
                          label={item.label}
                          leadingIcon={item.leadingIcon}
                          onClick={item.onClick}
                          selected={item.selected ?? false}
                          trailingBadge={item.trailingBadge}
                          trailingIcon={item.trailingIcon}
                      />
                  ))
                : null}
        </div>
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
