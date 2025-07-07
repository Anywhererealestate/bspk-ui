import { SvgChevronRight } from '@bspk/icons/ChevronRight';
import { SvgClose } from '@bspk/icons/Close';
import { SvgKeyboardArrowDown } from '@bspk/icons/KeyboardArrowDown';

import { ChipUtility, ChipUtilityProps } from '-/components/ChipUtility';

export type chipTrailingIcon = 'SvgChevronRight' | 'SvgClose' | 'SvgKeyboardArrowDown';

export type ChipFilterProps = Pick<ChipUtilityProps, 'disabled' | 'label' | 'leadingIcon' | 'onClick'> & {
    /**
     * The trailing icon of the filter chip.
     *
     * You can only have one of the trailing options, a trailing icon **or** a trailing badge. If both are present the
     * trailingIcon will be visible.
     */
    trailingIcon?: chipTrailingIcon;
    /**
     * The trailing Badge count.
     *
     * If a trailingIcon is provided the Badge will **not** be visible.
     */
    trailingBadgeCount?: number;
};

/**
 * Short form descriptive words that filter out content or represent active filter setting.
 *
 * @example
 *     import { ChipFilter } from '@bspk/ui/ChipFilter';
 *     import { SvgCloud } from '@bspk/icons/Cloud';
 *
 *     function Example() {
 *         return (
 *             <ChipFilter
 *                 label="FilterChip"
 *                 leadingIcon=<SvgCloud />
 *                 onClick={() => console.log('Filter Chip clicked')}
 *                 trailingIcon="SvgChevronRight"
 *             />
 *         );
 *     }
 *
 * @name ChipFilter
 * @phase DesignReview
 */
function ChipFilter({ disabled, label, leadingIcon, onClick, trailingIcon, trailingBadgeCount }: ChipFilterProps) {
    const trailingIconComponent =
        trailingIcon === 'SvgChevronRight' ? (
            <SvgChevronRight />
        ) : trailingIcon === 'SvgKeyboardArrowDown' ? (
            <SvgKeyboardArrowDown />
        ) : trailingIcon === 'SvgClose' ? (
            <SvgClose />
        ) : undefined;
    return (
        <ChipUtility
            disabled={disabled}
            label={label}
            leadingIcon={leadingIcon}
            onClick={onClick}
            trailingBadge={trailingBadgeCount ? { count: trailingBadgeCount } : undefined}
            trailingIcon={trailingIconComponent}
        />
    );
}

ChipFilter.bspkName = 'ChipFilter';

export { ChipFilter };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
