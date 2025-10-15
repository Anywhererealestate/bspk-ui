import { Chip, ChipProps } from './';

export type ChipSuggestionProps = Pick<ChipProps, 'disabled' | 'label' | 'onClick'>;

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
 *
 * @phase UXReview
 */
export function ChipSuggestion({ disabled, label, onClick }: ChipSuggestionProps) {
    return <Chip data-bspk="chip-suggestion" disabled={disabled} label={label} onClick={onClick} />;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
