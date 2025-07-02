import { ChipAssistProps } from '../../ChipAssist';
import { ComponentExample } from '../utils';

export const ChipAssistExample: ComponentExample<ChipAssistProps> = {
    presets: [
        {
            label: 'Assist example',
            propState: {
                label: 'chip option',
                leadingIcon: 'SignLanguage',
                onClick: () => {
                    // eslint-disable-next-line no-console
                    console.log('Chip clicked!');
                },
            },
        },
    ],
};
