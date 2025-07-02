import { ChipUtility, ChipUtilityProps } from './ChipUtility';

export type ChipSuggestionProps = Pick<ChipUtilityProps, 'label' | 'onClick'>;

/**
 * Component description.
 *
 * @example
 *     import { ChipSuggestion } from '@bspk/ui/ChipSuggestion';
 *
 *     function Example() {
 *         return <ChipSuggestion label="Suggestion Chip" onClick={() => console.log('Suggestion')} />;
 *     }
 *
 * @name ChipSuggestion
 * @phase WorkInProgress
 */
function ChipSuggestion({ label, onClick }: ChipSuggestionProps) {
    return <ChipUtility label={label} onClick={onClick} />;
}

ChipSuggestion.bspkName = 'ChipSuggestion';

export { ChipSuggestion };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
