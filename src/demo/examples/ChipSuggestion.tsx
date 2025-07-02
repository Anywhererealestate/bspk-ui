import { ChipSuggestionProps } from '../../ChipSuggestion';
import { ComponentExampleFn } from '../utils';

export const ChipSuggestionExample: ComponentExampleFn<ChipSuggestionProps> = ({ action }) => ({
    containerStyle: { width: '100%' },
    render: ({ props, Component }) => {
        return <Component {...props} onClick={() => action('ChipSuggestion clicked!')} />;
    },
    presets: [
        {
            label: 'ChipSuggestion example',
            propState: {
                label: 'chip option',
            },
        },
    ],
});
