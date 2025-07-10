import { ButtonProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const ButtonExample: ComponentExample<ButtonProps> = {
    presets: [
        {
            label: 'Icon & Text',
            propState: {
                icon: 'Add',
                label: 'Add',
            },
        },
        {
            label: 'Text only',
            propState: {
                label: 'Add',
                icon: undefined,
            },
        },
        {
            label: 'Icon only',
            propState: {
                showLabel: false,
                icon: 'Add',
                label: 'Add',
            },
        },
    ],
};
