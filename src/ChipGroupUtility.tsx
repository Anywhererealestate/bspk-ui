import './chip-group-utility.scss';

import { ChipUtility, ChipUtilityProps } from './ChipUtility';

export type ChipGroupItem = Pick<
    ChipUtilityProps,
    'disabled' | 'flat' | 'label' | 'leadingIcon' | 'onClick' | 'selected' | 'trailingIcon'
>;

export type ChipGroupUtilityProps = {
    /**
     * The array of Chip items.
     *
     * @example
     *     [
     *         { label: 'chip 1' },
     *         { label: 'chip 2' },
     *         { label: 'chip 3' },
     *         { label: 'chip 4' },
     *         { label: 'chip 5' },
     *         { label: 'chip 6' },
     *         { label: 'chip 7' },
     *     ];
     *
     * @type Array<ChipGroupItem>
     * @required
     */
    items: ChipGroupItem[];
    /**
     * To allow chips to wrap or scroll.
     *
     * @default true
     */
    wrap?: boolean;
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
 * @name ChipGroupUtility
 * @phase Utility
 */
function ChipGroupUtility({ items, wrap }: ChipGroupUtilityProps) {
    return (
        <span data-bspk="chip-group-utility" data-wrap={wrap || undefined}>
            {items.map((item, idx) => (
                <ChipUtility key={`chip-${idx}`} {...item} />
            ))}
        </span>
    );
}

ChipGroupUtility.bspkName = 'ChipGroupUtility';

export { ChipGroupUtility };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
