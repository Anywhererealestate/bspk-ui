import { ChipSuggestionProps } from '../../ChipSuggestion';
import { ComponentExample } from '../utils';

export const ChipSuggestionExample: ComponentExample<ChipSuggestionProps> = {
    presets: [
        {
            label: 'Suggestion example',
            propState: {
                label: 'chip option',
                onClick: () => {
                    // eslint-disable-next-line no-console
                    console.log('Chip clicked!');
                },
            },
        },
    ],
};
