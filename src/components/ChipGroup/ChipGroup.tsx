import './chip-group.scss';

import { ReactNode } from 'react';

import { ChipUtilityProps } from '-/components/ChipUtility';

export type ChipGroupItem = Pick<
    ChipUtilityProps,
    'disabled' | 'flat' | 'label' | 'leadingIcon' | 'onClick' | 'selected' | 'trailingBadge' | 'trailingIcon'
>;

export type ChipGroupProps = {
    /**
     * To allow chips to wrap. If set to false chips will scroll.
     *
     * @default true
     */
    wrap?: boolean;
    /** Only ChipUtility, ChipInput, ChipFilter, ChipSuggestion, or ChipAssist components should be used as children. */
    children?: ReactNode;
};
/**
 * Component description.
 *
 * @example
 *     import { ChipGroup } from '@bspk/ui/ChipGroup';
 *
 *     function Example() {
 *         return (
 *             <ChipGroup wrap={false}>
 *                 <ChipSuggestion label="suggestion 1" onClick={() => console.log('Suggestion 1')} />
 *                 <ChipSuggestion label="suggestion 2" onClick={() => console.log('Suggestion 2')} />
 *                 <ChipSuggestion label="suggestion 3" onClick={() => console.log('Suggestion 3')} />
 *             </ChipGroup>
 *         );
 *     }
 *
 * @name ChipGroup
 * @phase Design Review
 */
function ChipGroup({ children, wrap = true }: ChipGroupProps) {
    return (
        <div data-bspk="chip-group" data-wrap={wrap || undefined}>
            {children}
        </div>
    );
}

ChipGroup.bspkName = 'ChipGroup';

export { ChipGroup };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
