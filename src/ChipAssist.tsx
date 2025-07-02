import { ChipUtility, ChipUtilityProps } from './ChipUtility';

export type ChipAssistProps = Pick<ChipUtilityProps, 'label' | 'leadingIcon' | 'onClick'>;

/**
 * Component description.
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
 * @phase WorkInProgress
 */
function ChipAssist({ label, leadingIcon, onClick }: ChipAssistProps) {
    return <ChipUtility label={label} leadingIcon={leadingIcon} onClick={onClick} />;
}

ChipAssist.bspkName = 'ChipAssist';

export { ChipAssist };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
