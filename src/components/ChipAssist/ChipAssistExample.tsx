import { ComponentExampleFn } from '-/utils/demo';

import { ChipAssistProps } from '.';

export const ChipAssistExample: ComponentExampleFn<ChipAssistProps> = ({ action }) => ({
    containerStyle: { width: '100%' },
    render: ({ props, Component }) => {
        return <Component {...props} onClick={() => action('ChipAssist clicked!')} />;
    },
    presets: [
        {
            label: 'Basic ChipAssist',
            propState: {
                label: 'chip option',
            },
        },
        {
            label: 'with leadingIcon',
            propState: {
                label: 'chip option',
                leadingIcon: 'SignLanguage',
            },
        },
    ],
});
