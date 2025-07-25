import { ChipUtility, ChipUtilityProps } from '-/components/ChipUtility';

export type ChipAssistProps = Pick<ChipUtilityProps, 'disabled' | 'label' | 'leadingIcon' | 'onClick'>;

/**
 * A dynamic action element that helps trigger and perform an action for the customer. A supplement option to buttons.
 *
 * @example
 *     import { ChipAssist } from '@bspk/ui/ChipAssist';
 *     import { SvgCloud } from '@bspk/icons/Cloud';
 *
 *     function Example() {
 *         return (
 *             <ChipAssist
 *                 label="Assist Chip"
 *                 leadingIcon=<SvgCloud />
 *                 onClick={() => console.log('Assist Chip clicked')}
 *             />
 *         );
 *     }
 *
 * @name ChipAssist
 * @phase QA
 */
function ChipAssist({ disabled, label, leadingIcon, onClick }: ChipAssistProps) {
    return <ChipUtility disabled={disabled} label={label} leadingIcon={leadingIcon} onClick={onClick} />;
}

ChipAssist.bspkName = 'ChipAssist';

export { ChipAssist };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
