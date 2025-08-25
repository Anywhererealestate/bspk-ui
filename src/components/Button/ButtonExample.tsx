import { SvgPerson } from '@bspk/icons/Person';
import { ButtonProps } from '.';
import { ComponentExample } from '-/utils/demo';

export const ButtonExample: ComponentExample<ButtonProps> = {
    presets: [
        {
            label: 'Icon & Text',
            propState: {
                icon: 'Add',
                label: 'Add',
                iconOnly: false,
            },
        },
        {
            label: 'Text only',
            propState: {
                label: 'Add',
                icon: undefined,
                iconOnly: false,
            },
        },
        {
            label: 'Icon only',
            propState: {
                iconOnly: true,
                icon: 'Add',
                label: 'Add',
            },
        },
    ],
    variants: {
        iconOnly: () => ({ icon: <SvgPerson />, label: 'Person' }),
    },
};
