import { ChipSuggestionProps } from '.';
import { ComponentExampleFn } from '-/utils/demo';

export const presets = [
    {
        label: 'ChipSuggestion example',
        propState: {
            label: 'chip option',
        },
    },
    {
        label: 'disabled',
        propState: {
            label: 'chip option',
            disabled: true,
        },
    },
];

export const ChipSuggestionExample: ComponentExampleFn<ChipSuggestionProps> = ({ action }) => ({
    containerStyle: { width: '100%' },
    render: ({ props, Component }) => {
        return <Component {...props} onClick={() => action('ChipSuggestion clicked!')} />;
    },
    presets,
});
