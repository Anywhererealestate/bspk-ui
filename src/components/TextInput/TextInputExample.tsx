import { TextInputProps } from '.';
import { ComponentExample } from '-/utils/demo';


export const TextInputExample: ComponentExample<TextInputProps> = {
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
