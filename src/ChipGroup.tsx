import './chip-group.scss';

import { ReactElement } from 'react';

import { ChipAssist } from './ChipAssist';
import { ChipFilter } from './ChipFilter';
import { ChipInput } from './ChipInput';
import { ChipSuggestion } from './ChipSuggestion';
import { ChipUtility, ChipUtilityProps } from './ChipUtility';

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
    /** Only ChipUtility, ChipInput, ChipFilter, ChipSuggestion, or ChipAssist components are allowed as children. */
    children?:
        | Array<
              | ReactElement<typeof ChipAssist>
              | ReactElement<typeof ChipFilter>
              | ReactElement<typeof ChipInput>
              | ReactElement<typeof ChipSuggestion>
              | ReactElement<typeof ChipUtility>
          >
        | ReactElement<typeof ChipAssist>
        | ReactElement<typeof ChipFilter>
        | ReactElement<typeof ChipInput>
        | ReactElement<typeof ChipSuggestion>
        | ReactElement<typeof ChipUtility>;
};
/**
 * Component description.
 *
 * @example
 *     import { ChipGroupUtility } from '@bspk/ui/ChipGroupUtility';
 *
 *     function Example() {
 *         return (
 *             <ChipGroupUtility
 *                 items={[
 *                     { label: 'item 1' },
 *                     { label: 'item 2' },
 *                     { label: 'item 3' },
 *                     { label: 'item 4' },
 *                     { label: 'item 5' },
 *                     { label: 'item 6' },
 *                     { label: 'item 7' },
 *                 ]}
 *                 label="chip group example"
 *                 wrap={true}
 *             />
 *         );
 *     }
 *
 * @name ChipGroup
 * @phase WorkInProgress
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
