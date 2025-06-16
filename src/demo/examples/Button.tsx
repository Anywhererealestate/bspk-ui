import { ButtonProps } from '../../Button';
import { ComponentExample } from '../utils';

export const ButtonExample: ComponentExample<ButtonProps> = {
    presets: [
        {
            label: 'Icon & Text',
            state: {
                icon: 'Add',
                label: 'Add',
            },
        },
        {
            label: 'Text only',
            state: {
                label: 'Add',
            },
        },
        {
            label: 'Icon only',
            state: {
                showLabel: false,
                icon: 'Add',
                label: 'Add',
            },
        },
    ],
};
