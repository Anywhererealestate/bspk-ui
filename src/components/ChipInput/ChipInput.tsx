import { SvgClose } from '@bspk/icons/Close';

import { ChipUtility, ChipUtilityProps } from '-/components/ChipUtility';

export type ChipInputProps = Pick<ChipUtilityProps, 'disabled' | 'label' | 'leadingIcon' | 'onClick'> & {
    /**
     * If true, a close icon will be added and the chip can be removed.
     *
     * @default true
     */
    removable?: boolean;
};

/**
 * A range of short form key words or pieces of information a customer enters within multi entry field.
 *
 * @example
 *     import { ChipInput } from '@bspk/ui/ChipInput';
 *     import { SvgCloud } from '@bspk/icons/Cloud';
 *
 *     function Example() {
 *         return (
 *             <ChipInput
 *                 label="InputChip"
 *                 leadingIcon=<SvgCloud />
 *                 onClick={() => console.log('Input Chip clicked')}
 *             />
 *         );
 *     }
 *
 * @name ChipInput
 * @phase UXReview
 */
export function ChipInput({ disabled, label, leadingIcon, onClick, removable = true }: ChipInputProps) {
    return (
        <ChipUtility
            data-bspk="chip-input"
            disabled={disabled}
            label={label}
            leadingIcon={leadingIcon}
            onClick={onClick}
            trailingIcon={removable ? <SvgClose /> : undefined}
        />
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
