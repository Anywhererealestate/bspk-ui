import { ChipAssistProps } from '../../ChipAssist';
import { ComponentExampleFn } from '../utils';

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
        {
            label: 'disabled',
            propState: {
                label: 'chip option',
                leadingIcon: 'SignLanguage',
                disabled: true,
            },
        },
    ],
});
