import { TextInputProps } from '../../TextInput';
import { ComponentExample } from '../utils';

export const TextInputExample: ComponentExample<TextInputProps> = {
    containerStyle: { width: '280px' },
    presets: [
        {
            label: 'Currency',
            propState: {
                type: 'number',
                leading: '$',
                trailing: undefined,
                placeholder: 'currency',
            },
        },
        {
            label: 'Percent',
            propState: {
                type: 'number',
                leading: undefined,
                trailing: '%',
                placeholder: 'percent',
            },
        },
        {
            label: 'Dimension',
            propState: {
                type: 'number',
                leading: undefined,
                placeholder: 'dimensions',
                trailing: 'ft',
            },
        },
    ],
};
