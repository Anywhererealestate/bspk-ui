import { ChipUtility, ChipUtilityProps } from '-/components/ChipUtility';

export type ChipSuggestionProps = Pick<ChipUtilityProps, 'disabled' | 'label' | 'onClick'>;

/**
 * Dynamically generated options that are suggested to the customer as responses or prompts.
 *
 * @example
 *     import { ChipSuggestion } from '@bspk/ui/ChipSuggestion';
 *
 *     function Example() {
 *         return <ChipSuggestion label="Suggestion Chip" onClick={() => console.log('Suggestion')} />;
 *     }
 *
 * @name ChipSuggestion
 * @phase UXReview
 */
function ChipSuggestion({ disabled, label, onClick }: ChipSuggestionProps) {
    return <ChipUtility data-bspk="chip-suggestion" disabled={disabled} label={label} onClick={onClick} />;
}

ChipSuggestion.bspkName = 'ChipSuggestion';

export { ChipSuggestion };

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
