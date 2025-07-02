import { SvgClose } from '@bspk/icons/Close';

import { ChipUtility, ChipUtilityProps } from './ChipUtility';

export type ChipInputProps = Pick<ChipUtilityProps, 'label' | 'leadingIcon' | 'onClick' | 'trailingIcon'> & {
    /**
     * If true, a close icon will be added and the chip can be removed.
     *
     * @default true
     */
    removable?: boolean;
};

/**
 * Component description.
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
 * @phase WorkInProgress
 */
function ChipInput({ label, leadingIcon, onClick, removable = true }: ChipInputProps) {
    return (
        <ChipUtility
            label={label}
            leadingIcon={leadingIcon}
            onClick={onClick}
            trailingIcon={removable ? <SvgClose /> : undefined}
        />
    );
}

ChipInput.bspkName = 'ChipInput';

export { ChipInput };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
