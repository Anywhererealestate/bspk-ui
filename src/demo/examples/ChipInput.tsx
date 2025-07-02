import { ChipInputProps } from '../../ChipInput';
import { ComponentExample } from '../utils';

export const ChipInputExample: ComponentExample<ChipInputProps> = {
    presets: [
        {
            label: 'Input example',
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
