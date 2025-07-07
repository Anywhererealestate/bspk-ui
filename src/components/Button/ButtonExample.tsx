import { ComponentExample } from '-/utils/demo';

import { ButtonProps } from '.';

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
