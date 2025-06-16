import { TextInputProps } from '../../TextInput';
import { ComponentExample } from '../utils';

export const TextInputExample: ComponentExample<TextInputProps> = {
    containerStyle: { width: '280px' },
    presets: [
        {
            label: 'Currency',
            state: {
                type: 'number',
                leading: '$',
                trailing: undefined,
                placeholder: 'currency',
            },
        },
        {
            label: 'Percent',
            state: {
                type: 'number',
                leading: undefined,
                trailing: '%',
                placeholder: 'percent',
            },
        },
        {
            label: 'Dimension',
            state: {
                type: 'number',
                leading: undefined,
                placeholder: 'dimensions',
                trailing: 'ft',
            },
        },
    ],
};
